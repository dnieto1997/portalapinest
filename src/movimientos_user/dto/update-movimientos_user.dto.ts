import { PartialType } from '@nestjs/swagger';
import { CreateMovimientosUserDto } from './create-movimientos_user.dto';

export class UpdateMovimientosUserDto extends PartialType(CreateMovimientosUserDto) {}
