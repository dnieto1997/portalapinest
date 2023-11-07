import { Injectable } from '@nestjs/common';
import { CreateLogsCallbackDto } from './dto/create-logs_callback.dto';
import { UpdateLogsCallbackDto } from './dto/update-logs_callback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsCallback } from './entities/logs_callback.entity';

@Injectable()
export class LogsCallbackService {
  constructor(
    @InjectRepository(LogsCallback) 
    private logscallback: Repository<LogsCallback>,
){}



  async findAll() {
  
    const Search= await this.logscallback.find({order: {uid: "DESC"}})

    return Search
  }

  
}
