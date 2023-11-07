import { PartialType } from '@nestjs/swagger';
import { CreateChangestatusDto } from './create-changestatus.dto';

export class UpdateChangestatusDto extends PartialType(CreateChangestatusDto) {}
