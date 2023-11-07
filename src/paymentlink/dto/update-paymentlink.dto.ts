import { PartialType } from '@nestjs/swagger';
import { CreatePaymentlinkDto } from './create-paymentlink.dto';

export class UpdatePaymentlinkDto extends PartialType(CreatePaymentlinkDto) {}
