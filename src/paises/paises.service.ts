import { Injectable } from '@nestjs/common';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paise } from './entities/paise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisesService {

  constructor(
    @InjectRepository(Paise) private country:Repository<Paise>,
  ){}
  async create(createPaiseDto: CreatePaiseDto) {
    const newUser = this.country.create(createPaiseDto);
    const saveUser =  await this.country.save(newUser);

    return saveUser
  }

  findAll() {
    return `This action returns all paises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paise`;
  }

  update(id: number, updatePaiseDto: UpdatePaiseDto) {
    return `This action updates a #${id} paise`;
  }

  remove(id: number) {
    return `This action removes a #${id} paise`;
  }
}
