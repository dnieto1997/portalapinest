import { Injectable } from '@nestjs/common';
import { CreateConfNequiDto } from './dto/create-conf_nequi.dto';
import { UpdateConfNequiDto } from './dto/update-conf_nequi.dto';

@Injectable()
export class ConfNequiService {
  create(createConfNequiDto: CreateConfNequiDto) {
    return 'This action adds a new confNequi';
  }

  findAll() {
    return `This action returns all confNequi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confNequi`;
  }

  update(id: number, updateConfNequiDto: UpdateConfNequiDto) {
    return `This action updates a #${id} confNequi`;
  }

  remove(id: number) {
    return `This action removes a #${id} confNequi`;
  }
}
