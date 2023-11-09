import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { TopupNequiService } from './topup_nequi.service';
import { CreateTopupNequiDto } from './dto/create-topup_nequi.dto';
import { UpdateTopupNequiDto } from './dto/update-topup_nequi.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ArrayTopup } from './dto/array.dto';
@Controller('topup-nequi')
export class TopupNequiController {
  constructor(private readonly topupNequiService: TopupNequiService) {}


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.topupNequiService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('tabletopup')
  table(@Body() createtopup: CreateTopupNequiDto,@Request() req) {
    return this.topupNequiService.table(createtopup,req.user);
  }
  @UseGuards(AuthGuard)
  @Patch('save')
  save(@Body() update: UpdateTopupNequiDto,@Request() req) {
    return this.topupNequiService.save(update,req.user);
  }


  @UseGuards(AuthGuard)
  @Patch('recharge/:uid')
  recharge(@Request() req,@Param('uid') uid: string) {
    return this.topupNequiService.recharge(uid,req.user);
  }


  @UseGuards(AuthGuard)
  @Patch('rechargeall')
  rechargeall(@Body() array: ArrayTopup,@Request() req) {
    return this.topupNequiService.rechargeall(array,req.user);
  }

  
  @UseGuards(AuthGuard)
  @Get('history')
  history(@Body() createtopup: CreateTopupNequiDto,@Request() req) {
    return this.topupNequiService.history(createtopup,req.user);
  }

  @UseGuards(AuthGuard)
  @Get('balance')
  balance(@Request() req) {
    return this.topupNequiService.balance(req.user);
  }

}
