import { Controller, Get, Post, Body, Patch, Param, Delete,Request,UseGuards  } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { AuthGuard } from '../auth/jwt.guard';
import { ArrayPayout } from './dto/array-payout.dto';
import { ArrayPayout2 } from './dto/array-payout.dto2';
import { SuccessPayout } from './dto/successpayout.dto';
import { filterPayout } from './dto/filter-payout.dto';
import { PayoutPeru } from './dto/payoutperu.dto';
import { ApiTags } from '@nestjs/swagger';
import { CallbackService } from 'src/callback/callback.service';
import { LogsCallbackService } from 'src/logs_callback/logs_callback.service';
import { ArrayComparar } from './dto/comparar.dto';
@ApiTags('payout')
@Controller('payout')
export class PayoutController {
  constructor(private readonly payoutService: PayoutService )
   {}

  @UseGuards(AuthGuard)
  @Post('import/:country')
  import(@Body() array: ArrayPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.import(array,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Post('changestatus/:country')
  changestatus(@Request() req,@Param('country') country: string) {
    return this.payoutService.changestatus(req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('notifyall/:country')
  notifyall(@Body() array: ArrayPayout2,@Request() req,@Param('country') country: string) {
    return this.payoutService.notifyall(array,req.user,country);
  }



  @UseGuards(AuthGuard)
  @Get('successpayout/:country')
  successpayout(@Body() successpayout: SuccessPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.successpayout(successpayout,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Get('table/:country')
  tablePayout(@Body() createPayoutDto: CreatePayoutDto,@Request() req,@Param('country') country: string) {
    return this.payoutService.tablepayout(createPayoutDto,req.user,country);
  }

  
  @UseGuards(AuthGuard)
  @Post('filter/:country')
  filterPayout(@Body() filter: filterPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.filter(filter,req.user,country);
  }


    
  @UseGuards(AuthGuard)
  @Get('reason')
  seereason(@Body() filter: filterPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.reason(filter,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Patch('payments/:country')
  payment(@Body() filter: ArrayComparar,@Request() req,@Param('country') country: string) {
    return this.payoutService.payment(filter,req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('tablepayoutperu/:country')
  tablePayoutperu(@Body() createPayoutDto: SuccessPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.tablepayoutperu(createPayoutDto,req.user,country);
  }

  @UseGuards(AuthGuard)
  @Patch('paymentsperu/:country/:uid')
  paymentperu(@Param('uid') uid: number, @Body() PayoutPeru: PayoutPeru,@Param('country') country: string,@Request() req) {
    return this.payoutService.paymentperu(uid, PayoutPeru,country,req.user);
  }

  @UseGuards(AuthGuard)
  @Patch('payments/:country/:id')
  update(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string) {
    return this.payoutService.update(+id, updatePayoutDto,country);
  }

  @UseGuards(AuthGuard)
  @Patch('declined/:country/:id')
  declined(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string,@Request() req) {
    return this.payoutService.declined(+id, updatePayoutDto,country,req.user);
  }


  @UseGuards(AuthGuard)
  @Patch('declinedperu/:country/:id')
  declinedperu(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string,@Request() req) {
    return this.payoutService.declinedperu(+id, updatePayoutDto,country,req.user);
  }


}
