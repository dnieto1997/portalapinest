import { PartialType } from '@nestjs/swagger';
import { CreateMasivaDto } from './create-masiva.dto';

export class UpdateMasivaDto extends PartialType(CreateMasivaDto) {}
