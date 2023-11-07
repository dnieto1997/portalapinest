import { PartialType } from '@nestjs/swagger';
import { CreateUtiliesDto } from './create-utilidade.dto';

export class UpdateUtilidadeDto extends PartialType(CreateUtiliesDto) {}
