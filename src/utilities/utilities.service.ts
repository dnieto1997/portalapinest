import { Injectable } from '@nestjs/common';
import { CreateUtiliesDto } from './dto/create-utilidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';



@Injectable()
export class UtilitiesService {
  constructor(
    @InjectRepository(MovimientosColombia) 
    private movementscol: Repository<MovimientosColombia>,

    @InjectRepository(MovimientosPeru) 
    private movementscolper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) 
    private movementscolmxt: Repository<MovimientosMexico>,
    
){}
 
async utilities(createUtilidad: CreateUtiliesDto,response,country) {


  const {initialdate,finaldate}=createUtilidad




const selectedRepository =
country === 'PEN' ? this.movementscolper :
country === 'MXT' ? this.movementscolmxt :
this.movementscol


 const query= selectedRepository.createQueryBuilder('movimiento')
  .select([
    'MONTH(movimiento.updated_at) AS fecha',
    'movimiento.merchant_name AS cliente',
    'COUNT(movimiento.uid) AS transacciones',
    'SUM(movimiento.amount) AS sumatoria',
    'SUM(movimiento.cost) AS utilidad',
    'SUM(movimiento.cost) AS total',
    'SUM(CASE WHEN movimiento.type_transaction = 1 THEN movimiento.amount - (movimiento.cost + movimiento.iva) ELSE 0 END + CASE WHEN movimiento.type_transaction = 3 THEN movimiento.amount - (movimiento.cost + movimiento.iva) ELSE 0 END) AS payin',
    'SUM(CASE WHEN movimiento.type_transaction = 1 THEN 1 ELSE 0 END + CASE WHEN movimiento.type_transaction = 3 THEN 1 ELSE 0 END) AS payincount',
    'SUM(CASE WHEN movimiento.type_transaction = 2 THEN movimiento.amount + (movimiento.cost + movimiento.iva) ELSE 0 END) AS payout',
    'SUM(CASE WHEN movimiento.type_transaction = 2 THEN 1 ELSE 0 END) AS payoutcount',
    'movimiento.merchant_id',
  ])
  .where('movimiento.merchant_id != :merchantId', { merchantId: 3 })
  .andWhere('movimiento.status = :status', { status: '1' })
  .andWhere('DATE(movimiento.updated_at) BETWEEN :initialdate AND :finaldate', { initialdate:initialdate, finaldate:finaldate })
  .groupBy('movimiento.merchant_id, movimiento.merchant_name, MONTH(movimiento.updated_at)');



  

const results = await query.getRawMany();


return results
    
  
  }


}
