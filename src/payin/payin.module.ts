import { Module } from '@nestjs/common';
import { PayinService } from './payin.service';
import { PayinController } from './payin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { MovimientosUser } from 'src/movimientos_user/entities/movimientos_user.entity';

@Module({
  controllers: [PayinController],
  providers: [PayinService],
  imports:[ 
    TypeOrmModule.forFeature([MovimientosColombia,Masiva,MovimientosPeru,MovimientosMexico,Merchant,MovimientosUser]),
  ]
})
export class PayinModule {}
