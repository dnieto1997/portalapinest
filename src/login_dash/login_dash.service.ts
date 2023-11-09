import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDashDto } from './dto/create-login_dash.dto';
import { UpdateLoginDashDto } from './dto/update-login_dash.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDash } from './entities/login_dash.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginDashService {

  constructor(
    @InjectRepository(LoginDash) private logiDashRepository:Repository<LoginDash>
  ){}

  async create(createLoginDashDto: CreateLoginDashDto) {

    const { log_usuario } = createLoginDashDto;

    const existUser = await this.logiDashRepository.findOneBy({log_usuario});

    if(existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    const newUser = this.logiDashRepository.create(createLoginDashDto);
    const saveUser =  await this.logiDashRepository.save(newUser);

    return saveUser;
  }



  async findAll() {
    const user = await this.logiDashRepository.find();
    return user;
  }


  



  async findOne(id: number) {

    const existUser = await this.logiDashRepository.findOneBy({log_id:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    return existUser;

  }

  async update(id: number, updateLoginDashDto: UpdateLoginDashDto) {
    
    const existUser = await this.logiDashRepository.findOneBy({log_id:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    const updateUser = await this.logiDashRepository.preload({
      log_id:id,
      ...updateLoginDashDto
    });

    return await this.logiDashRepository.save(updateUser);

  }

  async remove(id: number) {

    const existUser = await this.logiDashRepository.findOneBy({log_id:id});

    if(!existUser){
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    let status = '1';

    if(existUser.log_estado == '1'){
      status ='2';
    }else{
      status ='1';
    }
    const updateUser = await this.logiDashRepository.preload({
      log_id:id,
      log_estado: status
    });

    return await this.logiDashRepository.save(updateUser);
  }
}
