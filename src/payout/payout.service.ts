import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { ArrayPayout } from './dto/array-payout.dto';
import { ArrayPayout2 } from './dto/array-payout.dto2';
import { SuccessPayout } from './dto/successpayout.dto';
import { filterPayout } from './dto/filter-payout.dto';
import { PayoutPeru } from './dto/payoutperu.dto';
import { dateact } from 'src/helper/date.helper';
import { MovimientosUser } from 'src/movimientos_user/entities/movimientos_user.entity';
import { CallbackService } from 'src/callback/callback.service';
import { Comparar } from './entities/comparar.entity';
import { ArrayComparar } from './dto/comparar.dto';

@Injectable()
export class PayoutService {

  constructor(
    @InjectRepository(MovimientosColombia)
    private movementscol: Repository<MovimientosColombia>,
    @InjectRepository(Masiva)
    private masive: Repository<Masiva>,
    @InjectRepository(MovimientosPeru) private movementsper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private movementsmx: Repository<MovimientosMexico>,
    @InjectRepository(Merchant)
    private merchants: Repository<Merchant>,
    @InjectRepository(Comparar)
    private compare: Repository<Comparar>,
    @InjectRepository(MovimientosUser)
    private movements_user: Repository<MovimientosUser>,
    private readonly callbackService: CallbackService
    
  ) { }
  async import(array: ArrayPayout, response, country) {

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
        'aliado.cashout as costo',
        'aliado.iva',
        'aliado.uid AS merchant',
        'aliado.url_response',
        'movimiento.currency',
        'movimiento.amount',
      ])
      .innerJoin(
        'Aliado',
        'aliado',
        'aliado.uid = movimiento.merchant_id'
      )
      .where('movimiento.reference IN (:...references)', { references: newArr })
      .getRawMany();



    const result = results.map((mv) => {
   const repeated = array.array.find((rp) => rp.reference === mv.movimiento_reference);


      return {
        reference: mv.movimiento_reference,
        status: String(repeated.status),
        usuario: user,
        fecha: date,
        cost: String(mv.costo),
        iva: String(mv.aliado_iva),
        url_response: mv.aliado_url_response,
        motivo: repeated.motivo,
        currency: mv.movimiento_currency,
        amount: mv.movimiento_amount,
        provider: repeated.provider,
        mov_update: false,
        uid: mv.movimiento_uid

      };


    });



    const saveUser = await this.masive.save(result);

    return ({
      msg: 'Successful import',
      arr: array.array.length,
      alert2: 1
    });




  }



  async changestatus(response, country) {

    let respuesta = 0;
    const masive2 = await this.masive.findBy({ msg: 1 })

    for (const masiva of masive2) {
      if (masiva.status === '1' || masiva.status === '3') {
        respuesta++;

        const selectedRepository =
          country === 'PEN' ? this.movementsper :
            country === 'MXT' ? this.movementsmx :
              this.movementscol


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


        const updateData3 = {
          mov_update: true
        };

        const updateUser2 = await this.masive.preload({
          uid: masiva.uid,
          ...updateData3
        });
        await this.masive.save(updateUser2);


      }

      return ({
        msg: 'Successful import',
        result: respuesta,
        alert2: 1
      });
    }




  }


  async notifyall(array: ArrayPayout2, response: any, country: any) {
    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol

    let respuesta = 0;
    for (const num of array.array) {

      const updateData2 = {
        msg: 2
      };

      const updateUser = await this.masive.preload({
        reference: num.reference,
        ...updateData2
      });
      await this.masive.save(updateUser);


      let statusL = '';

      if (num.status == 1) {
        statusL = 'success';
      } else if (num.status == 3) {
        statusL = 'declined';
      }


      const requestBody = {
        reference: num.reference,
        status: statusL,
        method: 'TUP_OUT',
        amount: num.amount,
        currency: num.currency,
        url: num.url_response
      };

      const respuestaCall = await this.callbackService.CallbackPayout(requestBody);

      console.log(respuestaCall);
      console.log('************************************************')
      respuesta++

      return ({
        msg: 'Importacion exitosa',
        result: respuesta,
        alert2: 1
      });
    }


  }


  async successpayout(successpayout: SuccessPayout, response: any, country: any) {


    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol

    const { initialdate, finaldate, status, aliado } = successpayout



    let sqlstatus = {}

    if (status == 0) {
      sqlstatus = { statuses: [1, 3] }
    } else if (status === 1) {
      sqlstatus = { statuses: 1 }
    } else if (status === 3) {
      sqlstatus = { statuses: 3 }
    }

    const query = selectedRepository
      .createQueryBuilder('movimientos')
      .select([
        'movimientos.*',
        'DATE(movimientos.created_at) AS fechac',
        'DATE(movimientos.updated_at) AS fechau',
        'IF(movimientos.status = 1, "Success", "Declined") AS estados',
        '(\'Buscando....\') AS motivo',
        'masiva.provider',
      ])
      .leftJoin(Masiva, 'masiva', 'movimientos.reference = masiva.reference')
      .where('movimientos.type_transaction = :typeTransaction', { typeTransaction: 2 })
      .andWhere('DATE(movimientos.updated_at) BETWEEN :fecha1 AND :fecha2', {
        fecha1: initialdate,
        fecha2: finaldate,
      })
      .andWhere('movimientos.status IN (:statuses)', sqlstatus);

    if (aliado) {
      query.andWhere('movimientos.merchant_id:merchant_id', { merchant_id: aliado });
    }


    const results = await query.getMany();


    return results


  }

  async tablepayout(createPayoutDto: CreatePayoutDto, response, country) {

    const { initialdate, finaldate, aliado, user } = createPayoutDto
    const { log_tipo, merchantid,id } = response

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
        'movimiento.amount * 4 / 1000 AS gmf',
        'movimiento.user_bank',
        'movimiento.user_type_account',
        'movimiento.user_num_account',
        'movimiento.merchant_name',
        'movimiento.updated_at',
        'movimiento.status',
        'CASE ' +
        'WHEN movimiento.status = 1 THEN "Success" ' +
        'WHEN movimiento.status = 2 THEN "Waiting" ' +
        'WHEN movimiento.status = 3 THEN "Declined" ' +
        'ELSE "Error" ' +
        'END AS estado',
        'masiva.motivo'


      ])
      .leftJoin(Masiva, 'masiva', 'masiva.reference = movimiento.reference')
      .where('movimiento.type_transaction = :type_transaction', { type_transaction: 2 })
      .andWhere('DATE(movimiento.created_at) BETWEEN :initialdate AND :finaldate', { initialdate, finaldate })
      .groupBy('movimiento.uid, masiva.reference, masiva.motivo,masiva.id')
      .orderBy('movimiento.uid', 'DESC');

    if (user) {
      queryBuilder.andWhere('movimiento.user_doc = :user', { user });
    }

    if (aliado) {
      queryBuilder.andWhere('movimiento.merchant_id = :merchant', { merchant: merchantid });
    }

    if (log_tipo === 'TE') {
      queryBuilder.andWhere('movimiento.merchant_id = :log_merchantid', { log_merchantid: merchantid });
    } else {
      queryBuilder.andWhere('movimiento.status = :status', { status: 2 });
    }

    const result = await queryBuilder.getMany();
    return result;



  }

  async tablepayoutperu(createPayoutDto: SuccessPayout, response, country) {

    const { initialdate, finaldate, status } = createPayoutDto
    const { log_tipo, merchantid } = response


    const date = dateact


    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol



    const query = selectedRepository
      .createQueryBuilder('m')


      .select([
        'm.uid',
        'm.user_name',
        'm.user_email',
        'm.reference',
        'm.user_doc',
        'm.user_phone',
        'm.method',
        'DATE(m.created_at) AS fecha',
        'TIME(m.created_at) AS hora',
        'm.amount',
        'm.user_bank',
        'm.user_type_account',
        'm.user_num_account',
        'm.merchant_name',
        'm.status',
        'm.cost',
        'm.iva',
        `CASE 
       WHEN m.status = 1 THEN 'SUCCESS'
       WHEN m.status = 2 THEN 'PENDING'
       WHEN m.status = 3 THEN 'DECLINED'
       ELSE 'NONE' 
     END AS estado`,
        `CONCAT("https://productionperu.toppaylatam.com/public/asset/consignaciones/", m.uid, ".jpg?nocache=${date}") AS url`,
      ])
      .where(`DATE(m.created_at) BETWEEN '${initialdate}' AND '${finaldate}'`);



    if (status === 1 || status === 3) {
      query.andWhere(`m.status = ${status}`);
    }

    if (log_tipo == "TE") {
      query.andWhere(`m.merchant_id = ${merchantid}`);
    }


    const result = await query.getRawMany();


    return result



  }

  async update(id: number, updatePayoutDto: UpdatePayoutDto, country) {
    const selectedRepository =
      country === 'PEN' ? this.movementsper :
        country === 'MXT' ? this.movementsmx :
          this.movementscol

    const movimientoB = await selectedRepository.findOneBy({ uid: id });

    const merchants1 = await this.merchants.findOneBy({ uid: movimientoB.merchant_id });


    if (!merchants1) {
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }


    const updateData = {
      status: 1,
      cost: merchants1.cashout,
      iva: merchants1.cashout * merchants1.iva,
      notify: 'E',
    };


    const updateUser = await selectedRepository.preload({
      uid: id,
      ...updateData
    });
    await selectedRepository.save(updateUser);

    const requestBody = ({
      reference: movimientoB.reference,
      status: 'success',
      method: 'TUP_OUT',
      amount: movimientoB.amount,
      currency: movimientoB.currency,
      referenceid: movimientoB.uid,
      url: merchants1.url_response,
      name:merchants1.merchant,
      uid:merchants1.uid,
      type: movimientoB.type_transaction,
      user: id
    });


  




    const call = this.callbackService.Callback(requestBody)


  if (call) {

      return { message: ` Successfully changed`, status: 1 }
    } else {
      return {
        message: { result: `Error changing state` },
        status: 1,
      };
    }
 

  }

  async declined(id: number, updatePayoutDto: UpdatePayoutDto, country, response) {
    const date = dateact
    const { motivo } = updatePayoutDto
    const { id: user } = response
    const selectedRepository =country === 'PEN' ? this.movementsper :country === 'MXT' ? this.movementsmx :this.movementscol
    const movimientoB = await selectedRepository.findOneBy({ uid: id });
    const merchants1 = await this.merchants.findOneBy({ uid: movimientoB.merchant_id });
    if (!merchants1) {
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }
    const dataMasiva = {
      reference: movimientoB.reference,
      status: "3",
      usuario: user,
      fecha: date,
      amount:movimientoB.amount,
      url_response: merchants1.url_response,
      cost: String(merchants1.cashout),
      iva: String(merchants1.cashout * merchants1.iva),
      currency: country,
      motivo: motivo,
      uid:movimientoB.uid
    }
    const saveUser = await this.masive.save(dataMasiva);
    const updateData = {
      status: 3,
      cost: merchants1.cashout,
      iva: merchants1.cashout * merchants1.iva,
      notify: 'E',
    };
    const updateUser = await selectedRepository.preload({
      uid: id,
      ...updateData
    });
    await selectedRepository.save(updateUser);
    const requestBody = {
      reference: movimientoB.reference,
      status: 'declined',
      method: 'TUP_OUT',
      amount: movimientoB.amount,
      currency: movimientoB.currency,
      referenceid: movimientoB.uid,
      url: merchants1.url_response,
      motivo: motivo,
      name:merchants1.merchant,
      uid:merchants1.uid,
      type: movimientoB.type_transaction,
      user: user
    };
    const call = await this.callbackService.CallbackPayout(requestBody)

    
   if (call) {

      return { message: ` Successfully changed`, status: 1 }
    } else {
      return {
        message: { result: `Error changing state` },
        status: 1,
      };
    } 
  }

  async filter(filter: filterPayout, response: any, country: any) {
    const selectedRepository =country === 'PEN' ? this.movementsper :country === 'MXT' ? this.movementsmx :this.movementscol
    const { uid, document, reference } = filter
    let sqlstatus = " "

    if (reference) {
      sqlstatus = `m.reference = '${reference}'`;
    } else if (document) {
      sqlstatus = `m.user_doc = '${document}'`;
    } else if (uid) {
      sqlstatus = `m.uid = ${uid}`;
    }
    if (!uid && !document && !reference) {
      return {
        result: [],
        alert2: 1,
        msg: 'Select a reference / Num Doc / ID',
      };
    }
    const query = selectedRepository
      .createQueryBuilder('m')
      .addSelect('DATE(m.updated_at)', 'fecha')
      .addSelect('DATE(m.created_at)', 'fechacreacion')
      .addSelect('TIME(m.created_at)', 'horacreacion')
      .addSelect('DATE(m.updated_at)', 'fechactualizacion')
      .addSelect('TIME(m.updated_at)', 'horactualizacion')
      .addSelect('a.motivo', 'motivo')
      .leftJoin(Masiva, 'a', 'a.reference = m.reference')
      .where(sqlstatus);
    const result = await query.getMany();

    if (result == null) {
      throw new HttpException('No encontrado', HttpStatus.CONFLICT);
    }


    return result
   
  }


  async paymentperu(uid, payoutperu: PayoutPeru, country: any,response) {
 

    const date = dateact

       const {reference,amount,method}=payoutperu
       const {id:user}=response

       const selectedRepository = country ==='PEN' ? this.movementsper :country === 'MXT' ? this.movementsmx :this.movementscol

       const searchref= await selectedRepository.findBy({reference_pro2:reference})


       if(searchref.length!=0){
        throw new HttpException('This reference is registered', HttpStatus.CONFLICT);
       } 
      
       const movements= await selectedRepository.findBy({uid:uid})


        const merchant = await this.merchants.findBy({uid:movements[0].merchant_id})
      
       for (const movements1 of movements) {
        
        const updateData = {
          status: 1,
          cost: amount* (merchant[0].pse_porcentaje/100),
          iva: (amount* (merchant[0].pse_porcentaje/100)) * 0.18,
          method: `${method? method:movements1.method}`,
          amount:String(amount),
          reference_pro2:`${reference}`,
          updated_at:`${date}`,
          notify: 'E',
        };

        const updateUser = await selectedRepository.preload({
          uid: uid,
          ...updateData
        });
        await selectedRepository.save(updateUser);
         
        const data = {
          user: user,
          movimiento: uid,
          date: date,
          tipo: "payout",
          estado: 1
      }
      await this.movements_user.save(data);
         
      const requestBody = {
        reference: movements1.reference,
        status: 'success',
        method: movements1.method,
        amount: amount,
        referenceid: uid,
        currency:movements1.currency,
        url: merchant[0].url_response,
        name:merchant[0].merchant,
        uid:merchant[0].uid,
        type: movements1.type_transaction,
        user: user

      };
      const call = await this.callbackService.CallbackPeru(requestBody)

      if (call) {

        return { message: ` Successfully changed`, status: 1 }
      } else {
        return {
          message: { result: `Error changing state` },
          status: 1,
        };
      }
    


       } 




  }

  async reason(filter: filterPayout, response: any, country: any) {
  
    const { reference } = filter
    const masiva = await this.masive.findOneBy({ reference: reference })
    if (masiva == null) {
      throw new HttpException('There is no reason with this reference', HttpStatus.CONFLICT);
    }
    return masiva
  }

  async payment(array: ArrayComparar, response, country) {
    const selectedRepository= country === 'PEN' ? this.movementsper :country === 'MXT' ? this.movementsmx :this.movementscol
    
  const {reference}=array

     if(reference.length==0){
      return ({
        result: [],
        msg: 'Select a document',
        alert2: 1
    });
     }

     const trun= await this.compare.query('TRUNCATE TABLE comparar');
     const referencesToSave = reference.map(ref => ({ reference: ref }));
     const savedReferences = await this.compare.save(referencesToSave);
     const results = await selectedRepository
     .createQueryBuilder('m')
     .select([
       'm.uid',
       'm.reference',
       'm.merchant_name',
       'm.amount',
       'm.status'
     ])
     .innerJoin('comparar', 'c', 'c.reference = m.reference')
     .where('m.status IN (:...statuses)', { statuses: [1, 3] })
     .getMany();
   
   console.log(results);
   
   
  
      return results

  }

  async declinedperu(uid, updatePayoutDto: UpdatePayoutDto, country: any,response) {
 

    const date = dateact

       const {motivo}=updatePayoutDto
       const {id:user}=response

       const selectedRepository = country ==='PEN' ? this.movementsper :country === 'MXT' ? this.movementsmx :this.movementscol

       const movements= await selectedRepository.findBy({uid:uid})


        const merchant = await this.merchants.findBy({uid:movements[0].merchant_id})
      
       for (const movements1 of movements) {
        
        const updateData = {
          status: 3,
          cost: Number(movements1.amount)* (merchant[0].pse_porcentaje/100),
          iva: (Number(movements1.amount)* (merchant[0].pse_porcentaje/100)) * 0.18,
          notify: 'E',
        };

        const updateUser = await selectedRepository.preload({
          uid: uid,
          ...updateData
        });
        await selectedRepository.save(updateUser);
         
        const data = {
          user: user,
          movimiento: uid,
          date: date,
          tipo: "payout",
          estado: 3
      }
      await this.movements_user.save(data);
         
      const requestBody = {
        reference: movements1.reference,
        status: 'success',
        method: movements1.method,
        amount: movements1.amount,
        referenceid: uid,
        motivo:motivo,
        url: merchant[0].url_response,
        name:merchant[0].merchant,
        uid:merchant[0].uid,
        type: movements1.type_transaction,
        user: user
      };
      const call = await this.callbackService.CallbackPeruDeclined(requestBody)

      if (call) {

        return { message: ` Successfully changed`, status: 1 }
      } else {
        return {
          message: { result: `Error changing state` },
          status: 1,
        };
      }
    


       } 




  }
 
}
