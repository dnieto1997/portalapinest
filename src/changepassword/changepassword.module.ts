import { Module } from '@nestjs/common';
import { ChangepasswordService } from './changepassword.service';
import { ChangepasswordController } from './changepassword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginDash } from 'src/login_dash/entities/login_dash.entity';

@Module({
  controllers: [ChangepasswordController],
  providers: [ChangepasswordService],
  imports: [
    TypeOrmModule.forFeature([LoginDash])
  ],
})
export class ChangepasswordModule {}
