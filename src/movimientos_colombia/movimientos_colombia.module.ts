import { Module } from '@nestjs/common';
import { MovimientosColombiaService } from './movimientos_colombia.service';
import { MovimientosColombiaController } from './movimientos_colombia.controller';
import { AliadoModule } from 'src/aliado/merchant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosColombia } from './entities/movimientos_colombia.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';


@Module({
  controllers: [MovimientosColombiaController],
  providers: [MovimientosColombiaService],
  imports:[ 
    AliadoModule,
    TypeOrmModule.forFeature([MovimientosColombia,Merchant]),
 
    
  ],
  
})
export class MovimientosColombiaModule {}
