import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { Banco } from 'src/bancos/entities/banco.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { Dispersione } from 'src/dispersiones/entities/dispersione.entity';

@Module({
  controllers: [BalancesController],
  providers: [BalancesService],
  imports:[ 
    TypeOrmModule.forFeature([MovimientosColombia,MovimientosPeru,MovimientosMexico,Banco,Merchant,Dispersione]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ]
})
export class BalancesModule {}
