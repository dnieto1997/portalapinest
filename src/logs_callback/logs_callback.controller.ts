import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogsCallbackService } from './logs_callback.service';
import { CreateLogsCallbackDto } from './dto/create-logs_callback.dto';
import { UpdateLogsCallbackDto } from './dto/update-logs_callback.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('logs-callback')
export class LogsCallbackController {
  constructor(private readonly logsCallbackService: LogsCallbackService) {}


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.logsCallbackService.findAll();
  }

 
}
