import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { Blacklist } from './entities/blacklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlacklistController],
  providers: [BlacklistService],
  imports: [ 
    TypeOrmModule.forFeature([Blacklist])
  ]
})
export class BlacklistModule {}
