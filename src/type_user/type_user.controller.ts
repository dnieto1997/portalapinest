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

  
  
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  
}
