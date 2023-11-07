import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { MovimientosUser } from 'src/movimientos_user/entities/movimientos_user.entity';
import { CallbackService } from 'src/callback/callback.service';
import { LogsCallbackService } from 'src/logs_callback/logs_callback.service';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';
import { LogsCallbackModule } from 'src/logs_callback/logs_callback.module';
import { Comparar } from './entities/comparar.entity';

@Module({
  controllers: [PayoutController],
  providers: [PayoutService,CallbackService],
  imports: [ 
    TypeOrmModule.forFeature([Masiva, MovimientosColombia, MovimientosPeru, MovimientosMexico, Merchant, MovimientosUser, LogsCallback,Comparar]),
    LogsCallbackModule, // Importa el módulo LogsCallbackModule aquí si no lo has hecho ya
  ]
})
export class PayoutModule {}
