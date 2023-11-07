import { Module } from '@nestjs/common';
import { MovimientosMexicoService } from './movimientos_mexico.service';
import { MovimientosMexicoController } from './movimientos_mexico.controller';
import { MovimientosMexico } from './entities/movimientos_mexico.entity';
import { AliadoModule } from 'src/aliado/merchant.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MovimientosMexicoController],
  providers: [MovimientosMexicoService],
  imports:[ 
    AliadoModule,
    TypeOrmModule.forFeature([MovimientosMexico]),
  ]
})
export class MovimientosMexicoModule {}
