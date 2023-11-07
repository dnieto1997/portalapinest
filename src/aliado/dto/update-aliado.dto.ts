import { PartialType } from '@nestjs/swagger';
import { CreateAliadoDto } from './create-aliado.dto';

export class UpdateAliadoDto extends PartialType(CreateAliadoDto) {


    
}
