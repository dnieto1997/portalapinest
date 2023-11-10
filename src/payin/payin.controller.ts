import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { PayinService } from './payin.service';
import { CreatePayinDto } from './dto/create-payin.dto';
import { UpdatePayinDto } from './dto/update-payin.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ArrayPayin } from './dto/array-payin.dto';
import { ArrayPayin2 } from './dto/array-payin.dto2';
@Controller('payin')
export class PayinController {
  constructor(private readonly payinService: PayinService) {}


  @UseGuards(AuthGuard)
  @Get(':country')
  successpayout(@Body() successpayout: CreatePayinDto,@Request() req,@Param('country') country: string) {
    return this.payinService.payin(successpayout,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Post('import/:country')
  import(@Body() array: ArrayPayin,@Request() req,@Param('country') country: string) {
    return this.payinService.import(array,req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('changestatus/:country')
  changestatus(@Request() req,@Param('country') country: string) {
    return this.payinService.changestatus(req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('notifyall/:country')
  notifyall(@Body() array: ArrayPayin2,@Request() req,@Param('country') country: string) {
    return this.payinService.notifyall(array,req.user,country);
  }

  
}
