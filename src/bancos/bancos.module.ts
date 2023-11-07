import { Module } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  controllers: [BancosController],
  providers: [BancosService],
  imports:[ 
    TypeOrmModule.forFeature([Banco]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    BancosService
  ],
})
export class BancosModule {}
