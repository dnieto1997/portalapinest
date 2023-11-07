import { PartialType } from '@nestjs/swagger';
import { CreateDispersioneDto } from './create-dispersione.dto';

export class UpdateDispersioneDto extends PartialType(CreateDispersioneDto) {}
