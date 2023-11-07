import { PartialType } from '@nestjs/swagger';
import { CreateMovimientosMexicoDto } from './create-movimientos_mexico.dto';

export class UpdateMovimientosMexicoDto extends PartialType(CreateMovimientosMexicoDto) {}
