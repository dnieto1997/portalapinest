import { Module } from '@nestjs/common';
import { LogsCallbackService } from './logs_callback.service';
import { LogsCallbackController } from './logs_callback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsCallback } from './entities/logs_callback.entity';



@Module({
  controllers: [LogsCallbackController],
  providers: [LogsCallbackService],
  imports: [ 
    TypeOrmModule.forFeature([LogsCallback]),
    LogsCallbackModule, // Importa el módulo LogsCallbackModule aquí si no lo has hecho ya
  ]
})
export class LogsCallbackModule {}
