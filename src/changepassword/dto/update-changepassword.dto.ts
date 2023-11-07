import { PartialType } from '@nestjs/swagger';
import { CreateChangepasswordDto } from './create-changepassword.dto';

export class UpdateChangepasswordDto extends PartialType(CreateChangepasswordDto) {}
