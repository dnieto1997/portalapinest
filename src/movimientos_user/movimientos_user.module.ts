import { Module } from '@nestjs/common';
import { MovimientosUserService } from './movimientos_user.service';
import { MovimientosUserController } from './movimientos_user.controller';

@Module({
  controllers: [MovimientosUserController],
  providers: [MovimientosUserService],
})
export class MovimientosUserModule {}
