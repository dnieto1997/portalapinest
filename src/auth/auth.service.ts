import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDash } from 'src/login_dash/entities/login_dash.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(LoginDash) private logiDashRepository:Repository<LoginDash>,
    private jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {

    const {log_clave, log_usuario} = createAuthDto;

    const existUser = await this.logiDashRepository.findOneBy({log_usuario});

    if(!existUser){
      throw new HttpException('User/Password Error', HttpStatus.CONFLICT);
    }

    const isPasswordValid = await compare(log_clave, existUser.log_clave);

    if(!isPasswordValid){
      throw new HttpException('User/Password Error', HttpStatus.CONFLICT);
    }

    if(existUser.log_estado == '2'){
      throw new HttpException('Contact the administrator', HttpStatus.CONFLICT);
    }

    const data_user = { id: existUser.log_id,user: existUser.log_usuario, merchantid:existUser.log_merchantid,log_tipo:existUser.log_tipo,status:existUser.log_estado,countries:existUser.log_pais,trm:existUser.trm}

    const token = this.jwtService.sign( data_user );

    const data = {
      token,
      data_user
    }
    return data;
  }

}
