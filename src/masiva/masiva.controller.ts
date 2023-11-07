import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasivaService } from './masiva.service';
import { CreateMasivaDto } from './dto/create-masiva.dto';
import { UpdateMasivaDto } from './dto/update-masiva.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('masiva')
@Controller('masiva')
export class MasivaController {
  constructor(private readonly masivaService: MasivaService) {}

  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createMasivaDto: CreateMasivaDto) {
    return this.masivaService.create(createMasivaDto);
  }

  @Get()
  findAll() {
    return this.masivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masivaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasivaDto: UpdateMasivaDto) {
    return this.masivaService.update(+id, updateMasivaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masivaService.remove(+id);
  }
}
