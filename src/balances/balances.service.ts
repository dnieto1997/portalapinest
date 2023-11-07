import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Repository } from 'typeorm';
import { Banco } from 'src/bancos/entities/banco.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { Dispersione } from 'src/dispersiones/entities/dispersione.entity';

@Injectable()

export class BalancesService {
  constructor(
    @InjectRepository(MovimientosColombia) private movementscol: Repository<MovimientosColombia>,
    @InjectRepository(MovimientosPeru) private movementsRepositoryper: Repository<MovimientosPeru>,
    @InjectRepository(MovimientosMexico) private movementsRepositorymxt: Repository<MovimientosMexico>,
    @InjectRepository(Banco) private bancos: Repository<Banco>,
    @InjectRepository(Merchant) private aliados: Repository<Merchant>,
    @InjectRepository(Dispersione) private dispersions: Repository<Dispersione>,

  ) { }



 async seebalance( response,country) {
   const {merchantid,log_tipo} =response
    const selectedRepository =
    country === 'PEN' ? this.movementsRepositoryper :
    country === 'MXT' ? this.movementsRepositorymxt :
     this.movementscol

     const queryBuilder = selectedRepository
     .createQueryBuilder('')
     .select(['COUNT(uid) AS und'])
     .addSelect('SUM(CASE WHEN type_transaction = 2 THEN (amount + cost + iva) ELSE 0 END) AS payout')
     .addSelect('SUM(CASE WHEN type_transaction IN (1, 3) THEN (amount - cost - iva) ELSE 0 END) AS payin')
     .where('status = :status', { status: '1' });
   if (log_tipo === 'TE') {
     queryBuilder.andWhere('merchant_id = :merchantId', { merchantId: merchantid });
   }
   const result = await queryBuilder.getRawOne();

   const queryBuilder2 = this.dispersions
   .createQueryBuilder('dispersiones')
   .select([
     'dispersiones.id',
     'dispersiones.fechapago',
     'dispersiones.banco',
     'dispersiones.cuenta',
     'dispersiones.valor',
     'dispersiones.tipo',
     'dispersiones.gmf',
     'dispersiones.estado',
     'dispersiones.merchant',
     'aliados.merchant as aliado',
     
     'CASE ' +
       'WHEN dispersiones.estado = 1 THEN "Success" ' +
       'WHEN dispersiones.estado = 2 THEN "Waiting" ' +
       'WHEN dispersiones.estado = 3 THEN "Declined" ' +
       'ELSE "Error" ' +
       'END AS estadon',
     'CASE ' +
       'WHEN dispersiones.tipo = "S" THEN "Salida" ' +
       'WHEN dispersiones.tipo = "E" THEN "Entrada" ' +
       'ELSE "Error" ' +
       'END AS tipon',
     ' if(dispersiones.banco REGEXP "^[0-9]"= 0, dispersiones.banco,bancos.nombre) AS bancoaliado',
     
 
   ])
   .leftJoin(Banco, 'bancos', 'bancos.id = dispersiones.banco')
   .leftJoin(Merchant, 'aliados', 'aliados.uid = dispersiones.merchant')
   .where('dispersiones.estado = 1')
   .orderBy('dispersiones.id', 'DESC');
 
 if (log_tipo === 'TE') {
   queryBuilder2.andWhere('dispersiones.merchant = :merchantId', { merchantId: merchantid });
 }
 
 const result2 = await queryBuilder2.getRawMany();


    return {result,result2};
  }
  async search(createBalanceDto: CreateBalanceDto, response,country) {



    const {merchant,initialdate,finaldate}=createBalanceDto

 
    let countryby =0
    if(country="COP"){
      countryby=1
    }else if(country="PEN"){
      countryby=2
    }else if(country="MXT"){
      countryby=3
    }
 
   
     const selectedRepository =
     country === 'PEN' ? this.movementsRepositoryper :
     country === 'MXT' ? this.movementsRepositorymxt :
      this.movementscol
 
      const queryBuilder = selectedRepository
        .createQueryBuilder("movimientos")
        .select("COUNT(uid) AS und")
        .addSelect("SUM(CASE WHEN type_transaction = '2' THEN amount + (cost + iva) ELSE 0 END) AS payout")
        .addSelect("SUM(CASE WHEN type_transaction = '1' THEN amount - (cost + iva) WHEN type_transaction = 3 THEN amount - (cost + iva) ELSE 0 END) AS payin")
        .where(`status = ${'1'}`)
        .andWhere(`(updated_at) BETWEEN '${initialdate}' AND '${finaldate}'`)
     
        if (merchant) {
          queryBuilder.andWhere("merchant_id = :merchant", { merchant:merchant });;
        }
     

     
    const result = await queryBuilder.getRawMany();

 

    const queryBuilder2 = this.dispersions
    .createQueryBuilder('dispersiones')
    .select([
      'dispersiones.id',
      'dispersiones.fechapago',
      'dispersiones.banco',
      'dispersiones.cuenta',
      'dispersiones.valor',
      'dispersiones.tipo',
      'dispersiones.gmf',
      'dispersiones.estado',
      'dispersiones.merchant',
      'aliado.merchant AS aliado',
      'CASE ' +
        'WHEN dispersiones.estado = 1 THEN "Success" ' +
        'WHEN dispersiones.estado = 2 THEN "Waiting" ' +
        'WHEN dispersiones.estado = 3 THEN "Declined" ' +
        'ELSE "Error" ' +
        'END AS estadon',
      'CASE ' +
        'WHEN dispersiones.tipo = "S" THEN "Salida" ' +
        'WHEN dispersiones.tipo = "E" THEN "Entrada" ' +
        'ELSE "Error" ' +
        'END AS tipon',
        " if(dispersiones.banco REGEXP '^[0-9]'= 0, dispersiones.banco,bancos.nombre) AS bancoaliado",
    ])
    .leftJoin(Banco, 'bancos', 'bancos.id = dispersiones.banco')
    .leftJoin(Merchant, 'aliado', 'aliado.uid = dispersiones.merchant')
    .where(`dispersiones.fechapago BETWEEN '${initialdate}' AND '${finaldate}' `)
    .andWhere( `dispersiones.pais = '${countryby}'`)
    .orderBy('dispersiones.id', 'DESC');

    if (merchant) {
      queryBuilder2.andWhere('dispersiones.merchant = :merchant', {merchant: merchant });
    }


  const result2 = await queryBuilder2.getRawMany();
  
     return {result,result2};
   }
  
}
