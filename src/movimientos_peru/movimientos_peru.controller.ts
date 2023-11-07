import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards} from '@nestjs/common';
import { MovimientosPeruService } from './movimientos_peru.service';
import { CreateMovimientosPeruDto } from './dto/create-movimientos_peru.dto';
import { UpdateMovimientosPeruDto } from './dto/update-movimientos_peru.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('movimientos-peru')
@Controller('movimientos-peru')
export class MovimientosPeruController {
  constructor(private readonly movimientosPeruService: MovimientosPeruService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createMovimientosPeruDto: CreateMovimientosPeruDto) {
    return this.movimientosPeruService.create(createMovimientosPeruDto);
  }

 
}
