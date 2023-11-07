import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request, UnauthorizedException } from '@nestjs/common';
import { MovimientosColombiaService } from './movimientos_colombia.service';
import { CreateMovimientosColombiaDto } from './dto/create-movimientos_colombia.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from "jwt-decode";
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from 'src/aliado/entities/merchant.entity';
import { Repository } from 'typeorm';

@ApiTags('movimientos-colombia')
@Controller('movimientos-colombia')
export class MovimientosColombiaController {
  constructor(private readonly movimientosColombiaService: MovimientosColombiaService,
    
    ) {}

  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  async create(@Body() createMovimientosColombiaDto: CreateMovimientosColombiaDto,@Request() req) {
    const token = req.headers['token']; 
    const decoded = jwtDecode(token);
  

     
      return this.movimientosColombiaService.create(createMovimientosColombiaDto,decoded);
   
  }

  
}
