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
  @Post('importar/:country')
  importar(@Body() array: ArrayPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.importar(array,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Post('cambiarestado/:country')
  cambiarestado(@Request() req,@Param('country') country: string) {
    return this.payoutService.cambiarestado(req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('notificartodo/:country')
  notificartodo(@Body() array: ArrayPayout2,@Request() req,@Param('country') country: string) {
    return this.payoutService.notificartodo(array,req.user,country);
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
  @Get('motivo')
  verMotivo(@Body() filter: filterPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.motivo(filter,req.user,country);
  }


  @UseGuards(AuthGuard)
  @Patch('pagos/:country')
  pagos(@Body() filter: ArrayComparar,@Request() req,@Param('country') country: string) {
    return this.payoutService.pagos(filter,req.user,country);
  }

  @UseGuards(AuthGuard)
  @Post('tablepayoutperu/:country')
  tablePayoutperu(@Body() createPayoutDto: SuccessPayout,@Request() req,@Param('country') country: string) {
    return this.payoutService.tablepayoutperu(createPayoutDto,req.user,country);
  }

  @UseGuards(AuthGuard)
  @Patch('pagarperu/:country/:uid')
  pagarperu(@Param('uid') uid: number, @Body() PayoutPeru: PayoutPeru,@Param('country') country: string,@Request() req) {
    return this.payoutService.pagarperu(uid, PayoutPeru,country,req.user);
  }

  @UseGuards(AuthGuard)
  @Patch('pagar/:country/:id')
  update(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string) {
    return this.payoutService.update(+id, updatePayoutDto,country);
  }

  @UseGuards(AuthGuard)
  @Patch('rechazar/:country/:id')
  rechazar(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string,@Request() req) {
    return this.payoutService.rechazar(+id, updatePayoutDto,country,req.user);
  }


  @UseGuards(AuthGuard)
  @Patch('rechazarperu/:country/:id')
  rechazarperu(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto,@Param('country') country: string,@Request() req) {
    return this.payoutService.rechazarperu(+id, updatePayoutDto,country,req.user);
  }


}
