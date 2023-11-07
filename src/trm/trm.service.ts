import { Injectable } from '@nestjs/common';
import { CreateTrmDto } from './dto/create-trm.dto';
import { UpdateTrmDto } from './dto/update-trm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trm } from './entities/trm.entity';
import { Repository } from 'typeorm';

@Injectable()

export class TrmService {
  constructor(
    @InjectRepository(Trm) private trm:Repository<Trm>,

  ){}
  async create(createTrmDto: CreateTrmDto) {
    const newUser = this.trm.create(createTrmDto);
    const saveUser =  await this.trm.save(newUser);
    
    
    return saveUser;
  }

 async findAll(country) {
  const lastInsertedTrm = await this.trm.find({where:{currency:country},order: {id: "DESC"},take:1})

  if (lastInsertedTrm.length > 0) {
    const { id, ...rest } = lastInsertedTrm[0];
    const modifiedResult = rest; // El resultado sin el campo 'id'
 
    return modifiedResult;
    
  }

  
    
   
  }

  findOne(id: number) {
    return `This action returns a #${id} trm`;
  }

  update(id: number, updateTrmDto: UpdateTrmDto) {
    return `This action updates a #${id} trm`;
  }

  remove(id: number) {
    return `This action removes a #${id} trm`;
  }
}
