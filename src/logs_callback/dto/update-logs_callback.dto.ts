import { PartialType } from '@nestjs/swagger';
import { CreateLogsCallbackDto } from './create-logs_callback.dto';

export class UpdateLogsCallbackDto extends PartialType(CreateLogsCallbackDto) {}
