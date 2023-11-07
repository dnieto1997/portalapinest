import { Module } from '@nestjs/common';
import { TrmService } from './trm.service';
import { TrmController } from './trm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trm } from './entities/trm.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  controllers: [TrmController],
  providers: [TrmService],
  imports:[ 
    TypeOrmModule.forFeature([Trm]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    TrmService
  ],
})
export class TrmModule {}
