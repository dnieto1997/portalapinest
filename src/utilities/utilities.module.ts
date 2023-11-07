import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';

@Module({
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
  imports:[ 
    TypeOrmModule.forFeature([MovimientosColombia,MovimientosMexico,MovimientosPeru]),
  ]
})
export class UtiliesModule {}
