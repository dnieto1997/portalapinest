import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { MovimientosMexicoService } from './movimientos_mexico.service';
import { CreateMovimientosMexicoDto } from './dto/create-movimientos_mexico.dto';
import { UpdateMovimientosMexicoDto } from './dto/update-movimientos_mexico.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('movimientos-mexico')
@Controller('movimientos-mexico')
export class MovimientosMexicoController {
  constructor(private readonly movimientosMexicoService: MovimientosMexicoService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createMovimientosMexicoDto: CreateMovimientosMexicoDto) {
    return this.movimientosMexicoService.create(createMovimientosMexicoDto);
  }

 
}
