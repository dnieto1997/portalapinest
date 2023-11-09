import { PartialType } from '@nestjs/swagger';
import { CreateTypeUserDto } from './create-type_user.dto';

export class UpdateTypeUserDto extends PartialType(CreateTypeUserDto) {}
