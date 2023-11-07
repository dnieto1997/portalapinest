import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { response } from 'express';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @UseGuards(AuthGuard)
  @Get('payin/:country')
  payin(@Body() createDashboardDto: CreateDashboardDto,@Request() req, @Param('country') country: string) {
    return this.dashboardService.payin( req.user,country);
  }

  @UseGuards(AuthGuard)
  @Get('payout/:country')
  payout(@Body() createDashboardDto: CreateDashboardDto,@Request() req, @Param('country') country: string) {
    return this.dashboardService.payout(req.user,country);
  }


  
  @UseGuards(AuthGuard)
  @Get('order/:country')
  order(@Body() createDashboardDto: CreateDashboardDto,@Request() req, @Param('country') country: string) {
    return this.dashboardService.order(req.user,country);
  }



  @UseGuards(AuthGuard)
  @Get('user')
  user(@Body() createDashboardDto: CreateDashboardDto,@Request() req) {
    return this.dashboardService.user(req.user);
  }


}
