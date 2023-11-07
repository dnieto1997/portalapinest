import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentlinkService } from './paymentlink.service';
import { CreatePaymentlinkDto } from './dto/create-paymentlink.dto';
import { UpdatePaymentlinkDto } from './dto/update-paymentlink.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('paymentlink')
export class PaymentlinkController {
  constructor(private readonly paymentlinkService: PaymentlinkService,
    ) {}
    @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPaymentlinkDto: CreatePaymentlinkDto) {
    return this.paymentlinkService.create(createPaymentlinkDto);
  }

  @Get()
  findAll() {
    return this.paymentlinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentlinkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentlinkDto: UpdatePaymentlinkDto) {
    return this.paymentlinkService.update(+id, updatePaymentlinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentlinkService.remove(+id);
  }
}
