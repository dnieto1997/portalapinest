import { Injectable } from '@nestjs/common';
import { CreateTypeUserDto } from './dto/create-type_user.dto';
import { UpdateTypeUserDto } from './dto/update-type_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUser } from './entities/type_user.entity';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUser) 
    private typeuser: Repository<TypeUser>,


    
){}
  create(createTypeUserDto: CreateTypeUserDto) {
    return 'This action adds a new typeUser';
  }

 async findAll() {
    const typeuser = await this.typeuser.find();
  console.log(typeuser)

    return typeuser
  }

  findOne(id: number) {
    return `This action returns a #${id} typeUser`;
  }

  update(id: number, updateTypeUserDto: UpdateTypeUserDto) {
    return `This action updates a #${id} typeUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeUser`;
  }
}
