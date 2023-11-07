import { PartialType } from '@nestjs/swagger';
import { CreateMovimientosPeruDto } from './create-movimientos_peru.dto';

export class UpdateMovimientosPeruDto extends PartialType(CreateMovimientosPeruDto) {}
