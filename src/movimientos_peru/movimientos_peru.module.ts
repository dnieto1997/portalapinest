import { Module } from '@nestjs/common';
import { MovimientosPeruService } from './movimientos_peru.service';
import { MovimientosPeruController } from './movimientos_peru.controller';
import { AliadoModule } from 'src/aliado/merchant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosPeru } from './entities/movimientos_peru.entity';

@Module({
  controllers: [MovimientosPeruController],
  providers: [MovimientosPeruService],
  imports:[ 
    AliadoModule,
    TypeOrmModule.forFeature([MovimientosPeru]),
  ]
})
export class MovimientosPeruModule {}
