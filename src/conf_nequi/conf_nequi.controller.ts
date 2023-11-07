import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfNequiService } from './conf_nequi.service';
import { CreateConfNequiDto } from './dto/create-conf_nequi.dto';
import { UpdateConfNequiDto } from './dto/update-conf_nequi.dto';

@Controller('conf-nequi')
export class ConfNequiController {
  constructor(private readonly confNequiService: ConfNequiService) {}

  @Post()
  create(@Body() createConfNequiDto: CreateConfNequiDto) {
    return this.confNequiService.create(createConfNequiDto);
  }

  @Get()
  findAll() {
    return this.confNequiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confNequiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfNequiDto: UpdateConfNequiDto) {
    return this.confNequiService.update(+id, updateConfNequiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confNequiService.remove(+id);
  }
}
