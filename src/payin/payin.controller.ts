import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { PayinService } from './payin.service';
import { CreatePayinDto } from './dto/create-payin.dto';
import { UpdatePayinDto } from './dto/update-payin.dto';
import { AuthGuard } from '../auth/jwt.guard';
@Controller('payin')
export class PayinController {
  constructor(private readonly payinService: PayinService) {}


  @UseGuards(AuthGuard)
  @Get(':country')
  successpayout(@Body() successpayout: CreatePayinDto,@Request() req,@Param('country') country: string) {
    return this.payinService.payin(successpayout,req.user,country);
  }

  
}
