import { Injectable } from '@nestjs/common';
import { CreateMovimientosUserDto } from './dto/create-movimientos_user.dto';
import { UpdateMovimientosUserDto } from './dto/update-movimientos_user.dto';

@Injectable()
export class MovimientosUserService {
  create(createMovimientosUserDto: CreateMovimientosUserDto) {
    return 'This action adds a new movimientosUser';
  }

  findAll() {
    return `This action returns all movimientosUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimientosUser`;
  }

  update(id: number, updateMovimientosUserDto: UpdateMovimientosUserDto) {
    return `This action updates a #${id} movimientosUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimientosUser`;
  }
}
