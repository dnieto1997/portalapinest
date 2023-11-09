import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeUserService } from './type_user.service';
import { CreateTypeUserDto } from './dto/create-type_user.dto';
import { UpdateTypeUserDto } from './dto/update-type_user.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('type_user')
@Controller('typeuser')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @Post()
  create(@Body() createTypeUserDto: CreateTypeUserDto) {
    return this.typeUserService.create(createTypeUserDto);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateTypeUserDto) {
    return this.typeUserService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeUserService.remove(+id);
  }
}
