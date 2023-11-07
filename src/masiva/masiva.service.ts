import { Injectable } from '@nestjs/common';
import { CreateMasivaDto } from './dto/create-masiva.dto';
import { UpdateMasivaDto } from './dto/update-masiva.dto';

@Injectable()
export class MasivaService {
  create(createMasivaDto: CreateMasivaDto) {
    return 'This action adds a new masiva';
  }

  findAll() {
    return `This action returns all masiva`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masiva`;
  }

  update(id: number, updateMasivaDto: UpdateMasivaDto) {
    return `This action updates a #${id} masiva`;
  }

  remove(id: number) {
    return `This action removes a #${id} masiva`;
  }
}
