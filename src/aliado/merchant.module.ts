import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService],
  imports:[ 
    TypeOrmModule.forFeature([Merchant]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {  },
    }),
  ],
  exports: [
    MerchantService
  ],
})
export class AliadoModule {}
