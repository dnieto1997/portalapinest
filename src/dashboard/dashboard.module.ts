import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';
import { MovimientosColombia } from 'src/movimientos_colombia/entities/movimientos_colombia.entity';
import { MovimientosPeru } from 'src/movimientos_peru/entities/movimientos_peru.entity';
import { MovimientosMexico } from 'src/movimientos_mexico/entities/movimientos_mexico.entity';
import { LoginDash } from 'src/login_dash/entities/login_dash.entity';


@Module({
  controllers: [DashboardController],
  providers: [DashboardService],

  imports:[ 
    TypeOrmModule.forFeature([MovimientosColombia,MovimientosPeru,MovimientosMexico,LoginDash]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    DashboardModule
  ],
})
export class DashboardModule {}
