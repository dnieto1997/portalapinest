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

@Injectable()
export class PayinService {
  constructor(
    @InjectRepository(MovimientosColombia)
    private movimientoscol: Repository<MovimientosColombia>,
    @InjectRepository(Masiva)
    private masiva: Repository<Masiva>,
    @InjectRepository(MovimientosPeru) private MovimientosRepositoryper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private MovimientosRepositorymxt: Repository<MovimientosMexico>,
    @InjectRepository(Merchant)
    private aliados: Repository<Merchant>,
    @InjectRepository(MovimientosUser)
    private movements_user: Repository<MovimientosUser>,
  ) { }
  create(createPayinDto: CreatePayinDto) {
    return 'This action adds a new payin';
  }

 async payin(createPayinDto: CreatePayinDto, response, country) {

    const { initialdate, finaldate,merchant,reference,status,user } = createPayinDto
    const { log_tipo, merchantid } = response

    const selectedRepository =
      country === 'PEN' ? this.MovimientosRepositoryper :
        country === 'MXT' ? this.MovimientosRepositorymxt :
          this.movimientoscol


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
      .andWhere( `DATE(movimiento.updated_at) BETWEEN '${initialdate}' AND '${finaldate}'`)
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
      queryBuilder.andWhere( `movimiento.status='${status}'`);
    }

    const result = await queryBuilder.getMany();
   
    return result;



  }

 
}
