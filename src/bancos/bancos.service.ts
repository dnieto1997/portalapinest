import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BancosService {

  constructor(
    @InjectRepository(Banco) private bank:Repository<Banco>,

  ){}
  async create(createBancoDto: CreateBancoDto) {
   


    const newUser = this.bank.create(createBancoDto);
    const saveUser =  await this.bank.save(newUser);
    
    
    return saveUser;
  }

  async findAll() {
    const bank = await this.bank.find();
    return bank;
  }

 async findOne(id: number) {
    const existUser = await this.bank.findOneBy({id:id});

    if(!existUser){
      throw new HttpException('Bank Does Not Exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

 
}
