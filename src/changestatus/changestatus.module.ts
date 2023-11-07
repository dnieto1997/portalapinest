import { Module } from '@nestjs/common';
import { ChangestatusService } from './changestatus.service';
import { ChangestatusController } from './changestatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { Masiva } from 'src/masiva/entities/masiva.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { CallbackService } from 'src/callback/callback.service';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';
import { LogsCallbackModule } from 'src/logs_callback/logs_callback.module';

@Module({
  controllers: [ChangestatusController],
  providers: [ChangestatusService,CallbackService],
  imports: [ 
    TypeOrmModule.forFeature([Masiva, MovimientosColombia, MovimientosPeru, MovimientosMexico, Merchant, LogsCallback]),
    LogsCallbackModule
  ]
})
export class ChangestatusModule {}
