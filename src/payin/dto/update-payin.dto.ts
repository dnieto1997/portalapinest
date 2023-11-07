import { PartialType } from '@nestjs/swagger';
import { CreatePayinDto } from './create-payin.dto';

export class UpdatePayinDto extends PartialType(CreatePayinDto) {}
