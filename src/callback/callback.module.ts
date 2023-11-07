import { Module } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackController } from './callback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsCallback } from 'src/logs_callback/entities/logs_callback.entity';
import { LogsCallbackModule } from 'src/logs_callback/logs_callback.module';
import { PayoutModule } from 'src/payout/payout.module';




@Module({
  controllers: [CallbackController],
  providers: [CallbackService],
  imports: [ 
    TypeOrmModule.forFeature([LogsCallback]), // Usa LogsCallbackRepository en lugar de LogsCallback
    LogsCallbackModule, // Importa el módulo LogsCallbackModule aquí si no lo has hecho ya
  ]
})
export class CallbackModule {}
