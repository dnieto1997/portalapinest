import { PartialType } from '@nestjs/swagger';
import { CreateMovimientosColombiaDto } from './create-movimientos_colombia.dto';
export class UpdateMovimientosColombiaDto extends PartialType(CreateMovimientosColombiaDto) {

    
}
