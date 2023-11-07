import { Module } from '@nestjs/common';
import { ConfNequiService } from './conf_nequi.service';
import { ConfNequiController } from './conf_nequi.controller';

@Module({
  controllers: [ConfNequiController],
  providers: [ConfNequiService],
})
export class ConfNequiModule {}
