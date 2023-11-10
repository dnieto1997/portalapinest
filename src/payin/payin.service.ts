import { Injectable } from '@nestjs/common';
import { CreatePayinDto } from './dto/create-payin.dto';
import { UpdatePayinDto } from './dto/update-payin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { In, Repository } from 'typeorm';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { MovimientosUser } from 'src/movimientos_user/entities/movimientos_user.entity';
import { dateact } from 'src/helper/date.helper';
import { ArrayPayin } from './dto/array-payin.dto';
import { CallbackService } from 'src/callback/callback.service';
import { ArrayPayin2 } from './dto/array-payin.dto2';

@Injectable()
export class PayinService {
  constructor(
    @InjectRepository(MovimientosColombia)
    private movementscol: Repository<MovimientosColombia>,
    @InjectRepository(Masiva)
    private masive: Repository<Masiva>,
    @InjectRepository(MovimientosPeru) private movementsper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private movementsmx: Repository<MovimientosMexico>,
    @InjectRepository(Merchant)
    private aliado: Repository<Merchant>,
    @InjectRepository(MovimientosUser)
    private movements_user: Repository<MovimientosUser>,
    private readonly callbackService: CallbackService
  ) { }
  create(createPayinDto: CreatePayinDto) {
    return 'This action adds a new payin';
  }

  async payin(createPayinDto: CreatePayinDto, response, country) {

    const { initialdate, finaldate, merchant, reference, status, user } = createPayinDto
    const { log_tipo, merchantid } = response

    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol


    const queryBuilder = selectedRepository
      .createQueryBuilder('movimiento')
      .select([
        'movimiento.uid',
        'movimiento.user_name',
        'movimiento.user_email',
        'movimiento.reference',
        'movimiento.user_doc',
        'movimiento.user_phone',
        'movimiento.method',
        'movimiento.currency',
        'DATE(movimiento.created_at) AS fecha',
        'TIME(movimiento.created_at) AS hora',
        'movimiento.amount',
        'movimiento.cost',
        'movimiento.iva',
        '(movimiento.cost + movimiento.iva) AS total',
        'movimiento.status'

      ])
      .where('movimiento.type_transaction IN (1, 3)')
      .andWhere(`DATE(movimiento.updated_at) BETWEEN '${initialdate}' AND '${finaldate}'`)
      .orderBy('movimiento.uid', 'DESC');

    if (user) {
      queryBuilder.andWhere('movimiento.user_doc = :user', { user });
    }

    if (merchant) {
      queryBuilder.andWhere('movimiento.merchant_id = :aliado', { aliado: merchantid });
    }

    if (log_tipo === 'TE') {
      queryBuilder.andWhere('movimiento.merchant_id = :log_merchantid', { log_merchantid: merchantid });
    }
    if (status) {
      queryBuilder.andWhere(`movimiento.status='${status}'`);
    }

    const result = await queryBuilder.getMany();

    return result;



  }

  async import(array: ArrayPayin, response, country) {

    if (array == undefined) {
      return response.json({
        msg: 'Select an xlxs file',
        alert2: 2
      });
    }


    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol


    const { id: user } = response


    const date = dateact
    let newArr = array.array.map(element => element.reference);

    const results = await selectedRepository
      .createQueryBuilder('movimiento')
      .select([
        'movimiento.uid',
        'movimiento.reference',
        'movimiento.method',
        'aliado.uid AS merchant',
        'aliado.url_response',
        'movimiento.currency',
        'movimiento.amount',
      ])
      .addSelect(`
      CASE
        WHEN movimiento.method IN (:...methodsNequi) THEN (movimiento.amount * (aliado.nequi_porcentaje/100)) + aliado.nequi_fijo
        WHEN movimiento.method = :methodPSE THEN (movimiento.amount * (aliado.pse_porcentaje/100)) + aliado.pse_fijo
        ELSE 0
      END AS cost
    `)
      .addSelect('aliado.iva')
      .innerJoin('Merchant', 'aliado', 'aliado.uid = movimiento.merchant_id')
      .where('movimiento.reference IN (:...references)', { references: newArr })
      .setParameter('methodsNequi', ['TUP_NEQUI', 'TUP_DAVIPLATA'])
      .setParameter('methodPSE', 'TUP_PSE')
      .getRawMany();




    const result = results.map((mv) => {
      const repeated = array.array.find((rp) => rp.reference === mv.movimiento_reference);


      return {
        reference: mv.movimiento_reference,
        status: String(repeated.status),
        usuario: user,
        fecha: date,
        cost: mv.cost,
        iva: String(mv.aliado_iva),
        url_response: mv.aliado_url_response,
        currency: mv.movimiento_currency,
        amount: mv.movimiento_amount,
        mov_update: false,
        uid: mv.movimiento_uid

      };


    });



    const saveUser = await this.masive.save(result);
    console.log(saveUser)

    return ({
      msg: 'Successful import',
      arr: array.array.length,
      alert2: 1
    });




  }

  async changestatus(response, country) {
    let respuesta = 0;
    const masive2 = await this.masive.find({ where: { msg: 1, status: '1' } });

    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol;

    const updates = masive2.map(async (masiva) => {
      if (masiva.status === '1' || masiva.status === '3') {
        respuesta++;

        const updateData = {
          status: Number(masiva.status),
          notify: 'E',
          cost: Number(masiva.cost),
          iva: Number(masiva.cost) * Number(masiva.iva)
        };

        const updateUser = await selectedRepository.preload({
          uid: masiva.uid,
          ...updateData
        });

        await selectedRepository.save(updateUser);

        const updateInfo = {
          mov_update: true
        };

        await this.masive.update({ uid: masiva.uid }, updateInfo);
      }
    });

    await Promise.all(updates);

    return {
      msg: 'Successful import',
      result: masive2.length,
      alert2: 1
    };
  }


  async notifyall(array: ArrayPayin2, response: any, country: any) {
    const selectedRepository =
    country === 'PEN' ? this.movementsper :
      country === 'MXT' ? this.movementsmx :
        this.movementscol;
    let respuesta = 0;
    const updates = [];

    for (const num of array.array) {
      const updateData2 = {
        msg: 2
      };

      await this.masive.update({ reference: num.reference }, updateData2);
      const search= await selectedRepository.findOneBy({reference:num.reference})
      

      let statusL = '';
      if (num.status == 1) {
        statusL = 'success';
      } else if (num.status == 3) {
        statusL = 'declined';
      }

      const requestBody = {
        reference: num.reference,
        status: statusL,
        method: num.method,
        amount: num.amount,
        currency: num.currency,
        url: num.url_response,
        referenceid:search.uid,
        uid:search.merchant_id,
        name:search.merchant_name,
        type:search.type_transaction,
        user:response.id
        
        
      };


      // Llamada asíncrona a la API
      this.callbackService.Callback(requestBody).then(respuestaCall => {
        updates.push(respuestaCall);
        console.log(respuestaCall);
        console.log('************************************************');
        respuesta++;
      })
    }

    await Promise.all(updates);

    return {
      msg: 'Importación exitosa',
      result: respuesta,
      alert2: 1
    };
  }


}
