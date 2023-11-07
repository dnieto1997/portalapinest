import { Module } from '@nestjs/common';
import { DispersionesService } from './dispersiones.service';
import { DispersionesController } from './dispersiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispersione } from './entities/dispersione.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';
import { Banco } from 'src/bancos/entities/banco.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';

@Module({
  controllers: [DispersionesController],
  providers: [DispersionesService],
  imports:[ 
    TypeOrmModule.forFeature([Dispersione,Banco,Merchant]),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    DispersionesService
  ],
})
export class DispersionesModule {}
