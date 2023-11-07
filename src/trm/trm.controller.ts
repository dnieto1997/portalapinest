import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrmService } from './trm.service';
import { CreateTrmDto } from './dto/create-trm.dto';
import { UpdateTrmDto } from './dto/update-trm.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('trm')
@Controller('trm')
export class TrmController {
  constructor(private readonly trmService: TrmService) {}
  @UseGuards(AuthGuard)
  
  @Post()
  create(@Body() createTrmDto: CreateTrmDto) {
    return this.trmService.create(createTrmDto);
  }
  
  @UseGuards(AuthGuard)
  @Get(':country')
  findAll(@Param('country') country: string) {
    return this.trmService.findAll(country);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrmDto: UpdateTrmDto) {
    return this.trmService.update(+id, updateTrmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trmService.remove(+id);
  }
}
