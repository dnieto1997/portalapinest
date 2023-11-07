import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Merchant } from 'src/aliado/entities/merchant.entity';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [ 
    TypeOrmModule.forFeature([Permission,Merchant]),
  
  ]
})
export class PermissionModule {}
