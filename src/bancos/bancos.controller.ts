import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('bancos')
@Controller('bancos')
export class BancosController {
  constructor(private readonly bancosService: BancosService) {}

  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createBancoDto: CreateBancoDto) {
    return this.bancosService.create(createBancoDto);
  }

  @Get()
  findAll() {
    return this.bancosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancosService.findOne(+id);
  }

}
