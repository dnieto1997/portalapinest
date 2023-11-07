import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Paise } from './entities/paise.entity';
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  controllers: [PaisesController],
  providers: [PaisesService],
  imports:[ 
    TypeOrmModule.forFeature([Paise]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    PaisesService
  ],
})
export class PaisesModule {}
