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
import { LogsCallbackModule } from 'src/logs_callback/logs_callback.module';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';
import { CallbackService } from 'src/callback/callback.service';

@Module({
  controllers: [PayinController],
  providers: [PayinService,CallbackService],
  imports: [ 
    TypeOrmModule.forFeature([Masiva, MovimientosColombia, MovimientosPeru, MovimientosMexico, Merchant, MovimientosUser, LogsCallback]),
    LogsCallbackModule, // Importa el módulo LogsCallbackModule aquí si no lo has hecho ya
  ]
})
export class PayinModule {}
