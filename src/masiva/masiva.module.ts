import { Module } from '@nestjs/common';
import { MasivaService } from './masiva.service';
import { MasivaController } from './masiva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Masiva } from './entities/masiva.entity';

@Module({
  controllers: [MasivaController],
  providers: [MasivaService],

})
export class MasivaModule {}
