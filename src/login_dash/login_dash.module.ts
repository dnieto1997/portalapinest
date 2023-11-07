import { Module } from '@nestjs/common';
import { LoginDashService } from './login_dash.service';
import { LoginDashController } from './login_dash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginDash } from './entities/login_dash.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginDash])
  ],
  controllers: [LoginDashController],
  providers: [LoginDashService],
})
export class LoginDashModule {}
