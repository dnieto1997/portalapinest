import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { LoginDash } from 'src/login_dash/entities/login_dash.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(MovimientosColombia) private movementscol: Repository<MovimientosColombia>,
    @InjectRepository(MovimientosPeru) private movementsRepositoryper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private movementsRepositorymxt: Repository<MovimientosMexico>,
    @InjectRepository(LoginDash) private login: Repository<LoginDash>,

  ) { }
  create(createDashboardDto: CreateDashboardDto) {

  }

  async payin(response,country) {


    const { log_tipo, merchantid} = response
    
   
    
    const onlyDate = new Date();
    onlyDate.setHours(0, 0, 0, 0);
    const date = onlyDate.toISOString().split('T')[0];

   const selectedRepository =
   country === 'PEN' ? this.movementsRepositoryper :
   country === 'MXT' ? this.movementsRepositorymxt :
    this.movementscol


    
    
    
    const moneyPayin2 = await selectedRepository
    .createQueryBuilder()
    .select(['sum(amount) AS total', '(currency) AS moneda'])
    .where('DATE(updated_at) = :date', { date: date })
    .andWhere(log_tipo === 'TE' ? `merchant_id = :merchant_id` : '1 = 1')
    .setParameters(log_tipo === 'TE' ? { merchant_id: merchantid } : {})
    .andWhere({ type_transaction: In([1, 3])})
    .andWhere('status = :status', { status: '1' }) 
    .groupBy('currency')
    .getRawOne();



    const Payinsucess = await selectedRepository
    .createQueryBuilder()
    .select(['COUNT(uid) as total', 'currency as moneda'])
    .where('DATE(updated_at) = :date', { date: date })
    .andWhere(log_tipo === 'TE' ? `merchant_id = :merchant_id` : '1 = 1')
    .setParameters(log_tipo === 'TE' ? { merchant_id: merchantid } : {})
    .andWhere({ type_transaction: In([1, 3])})
    .andWhere('status = :status', { status: '1' })
    .groupBy('currency')
    .getRawOne();

    
    const Payinpending = await selectedRepository
    .createQueryBuilder()
    .select(['COUNT(uid) as total', 'currency as moneda'])
    .where('DATE(updated_at) = :date', { date: date})
    .andWhere(log_tipo === 'TE' ? `merchant_id = :merchant_id` : '1 = 1')
    .setParameters(log_tipo === 'TE' ? { merchant_id: merchantid } : {})
    .andWhere({ type_transaction: In([1, 3])})
    .andWhere('status = :status', { status: '2' })
    .groupBy('currency')
    .getRawOne();
  
  
    return { "TodayMoneyTransaction": moneyPayin2,"payinSuccess":Payinsucess,"payinpending":Payinpending};
  }

  async payout(response,country) {
    const { log_tipo, merchantid } = response
    
 
    
    const onlyDate = new Date();
    onlyDate.setHours(0, 0, 0, 0);
    const date = onlyDate.toISOString().split('T')[0];
    
    
    const selectedRepository =
    country === 'PEN' ? this.movementsRepositoryper :
    country === 'MXT' ? this.movementsRepositorymxt :
     this.movementscol

    
    const moneyPayin = await selectedRepository
    .createQueryBuilder()
    .select(['sum(amount) AS total', '(currency) AS moneda'])
    .where('DATE(updated_at) = :date', { date: date })
    .andWhere(log_tipo === 'TE' ? `merchant_id = :merchant_id` : '1 = 1')
    .setParameters(log_tipo === 'TE' ? { merchant_id: merchantid } : {})
    .andWhere({ type_transaction: 2})
    .andWhere('status = :status', { status: '1' })
    .groupBy('currency')
    .getRawOne();


    const Payinsucess = await selectedRepository
    .createQueryBuilder()
    .select(['COUNT(uid) as total', 'currency as moneda'])
    .where('DATE(updated_at) = :date', { date: date })
    .andWhere(log_tipo === 'TE' ? `merchant_id = :merchant_id` : '1 = 1')
    .setParameters(log_tipo === 'TE' ? { merchant_id: merchantid } : {})
    .andWhere({ type_transaction: 2})
    .andWhere('status = :status', { status: '1' })
    .groupBy('currency')
    .getRawOne();


    
    return { "TodayMoneyTransaction": moneyPayin,"payoutSuccess":Payinsucess};
  }
  
  async order(response,country) {
    const { log_tipo, merchantid } = response
    
    const selectedRepository =
    country === 'PEN' ? this.movementsRepositoryper :
    country === 'MXT' ? this.movementsRepositorymxt :
     this.movementscol
    
    const query =  selectedRepository
    .createQueryBuilder()
    .select(['reference,amount,`method`,type_transaction,status '])
    .orderBy('created_at', 'DESC')
      .limit(7)

    
    if(merchantid){
    query.where(`merchant_id:${merchantid}`)
    } 
    

    const result = query.getRawMany();
    return result;
      

  }


  async user(response) {
    
    const merchant = await this.login.findOneBy({log_id:response.id});
 
    delete merchant.log_clave
    
    return merchant
  }

}
