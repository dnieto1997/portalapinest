import { Module } from '@nestjs/common';
import { TopupNequiService } from './topup_nequi.service';
import { TopupNequiController } from './topup_nequi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfNequi } from 'src/conf_nequi/entities/conf_nequi.entity';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { CallbackService } from 'src/callback/callback.service';
import { TopupNequi } from './entities/topup_nequi.entity';
import { LogsCallbackModule } from 'src/logs_callback/logs_callback.module';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';

@Module({
  controllers: [TopupNequiController],
  providers: [TopupNequiService,CallbackService],
  imports: [ 
    TypeOrmModule.forFeature([ConfNequi,MovimientosColombia,Merchant,TopupNequi,LogsCallback ]),
    LogsCallbackModule
   
  ]
  
})
export class TopupNequiModule {}
