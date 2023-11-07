import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}



}
