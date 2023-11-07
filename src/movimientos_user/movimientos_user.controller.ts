import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientosUserService } from './movimientos_user.service';
import { CreateMovimientosUserDto } from './dto/create-movimientos_user.dto';
import { UpdateMovimientosUserDto } from './dto/update-movimientos_user.dto';

@Controller('movimientos-user')
export class MovimientosUserController {
  constructor(private readonly movimientosUserService: MovimientosUserService) {}

  @Post()
  create(@Body() createMovimientosUserDto: CreateMovimientosUserDto) {
    return this.movimientosUserService.create(createMovimientosUserDto);
  }

  @Get()
  findAll() {
    return this.movimientosUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientosUserDto: UpdateMovimientosUserDto) {
    return this.movimientosUserService.update(+id, updateMovimientosUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosUserService.remove(+id);
  }
}
