import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';
import { ArrayBlacklist } from './dto/array-blacklist.dto';
import { AuthGuard } from '../auth/jwt.guard';
@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}
  @UseGuards(AuthGuard)
  @Post('import')
  import(@Body() array: ArrayBlacklist,@Request() req) {
    return this.blacklistService.import(array,req.user);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.blacklistService.findAll();
  }

  @Post('create')
  create(@Body() create: CreateBlacklistDto,@Request() req) {
    return this.blacklistService.create(create);
  }

  @Patch(':id')
  update(@Body() create: CreateBlacklistDto,@Request() req,@Param('id') id: number) {
    return this.blacklistService.update(create, req.user,id);
  }


}
