import { Module } from '@nestjs/common';
import { PaymentlinkService } from './paymentlink.service';
import { PaymentlinkController } from './paymentlink.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { Config } from 'src/config/entities/config.entity';

@Module({
  controllers: [PaymentlinkController],
  providers: [PaymentlinkService],
  imports: [ 
    TypeOrmModule.forFeature([ MovimientosColombia, MovimientosPeru, MovimientosMexico, Merchant,Config]),
  
  ]
})
export class PaymentlinkModule {}
