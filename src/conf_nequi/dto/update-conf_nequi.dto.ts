import { PartialType } from '@nestjs/swagger';
import { CreateConfNequiDto } from './create-conf_nequi.dto';

export class UpdateConfNequiDto extends PartialType(CreateConfNequiDto) {}
