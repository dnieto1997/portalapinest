import { Controller, Get, Post, Body, Patch, Param, Delete,Request,UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}



  @UseGuards(AuthGuard)
  @Get(':country')
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  seebalance(@Body() createBalanceDto: CreateBalanceDto,@Request() req, @Param('country') country: string) {
    return this.balancesService.seebalance(req.user,country);
  }


  @UseGuards(AuthGuard)
  @Get('buscar/:country')
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  search(@Body() createBalanceDto: CreateBalanceDto,@Request() req, @Param('country') country: string) {
    return this.balancesService.search(createBalanceDto,req.user,country);
  }



 
}
