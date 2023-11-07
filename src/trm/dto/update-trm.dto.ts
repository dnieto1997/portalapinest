import { PartialType } from '@nestjs/swagger';
import { CreateTrmDto } from './create-trm.dto';

export class UpdateTrmDto extends PartialType(CreateTrmDto) {}
