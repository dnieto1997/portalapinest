import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { DispersionesService } from './dispersiones.service';
import { CreateDispersioneDto } from './dto/create-dispersione.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('dispersiones')
@Controller('dispersiones')
export class DispersionesController {
  constructor(private readonly dispersionesService: DispersionesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createDispersioneDto: CreateDispersioneDto) {
    return this.dispersionesService.create(createDispersioneDto);
  }


  @UseGuards(AuthGuard)
  @Get('verdispersion/:country')
  verdispersion(@Body() createDispersioneDto: CreateDispersioneDto,@Request() req, @Param('country') country: string) {
    return this.dispersionesService.verdispersion(req.user,country);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.dispersionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispersionesService.findOne(+id);
  }


}
