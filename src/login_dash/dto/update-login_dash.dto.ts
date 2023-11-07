import { PartialType } from '@nestjs/swagger';
import { CreateLoginDashDto } from './create-login_dash.dto';

export class UpdateLoginDashDto extends PartialType(CreateLoginDashDto) {}
