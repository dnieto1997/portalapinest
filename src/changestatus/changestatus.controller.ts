import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { ChangestatusService } from './changestatus.service';
import { CreateChangestatusDto } from './dto/create-changestatus.dto';
import { UpdateChangestatusDto } from './dto/update-changestatus.dto';

import { AuthGuard } from '../auth/jwt.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('changestatus')
@Controller('changestatus')
export class ChangestatusController {
  constructor(private readonly changestatusService: ChangestatusService) {}

  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createChangestatusDto: CreateChangestatusDto) {
    return this.changestatusService.create(createChangestatusDto);
  }

  @Get()
  findAll() {
    return this.changestatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changestatusService.findOne(+id);
  }



  @UseGuards(AuthGuard)
  @Patch(':uid')
  uid(@Body() createChangestatusDto: CreateChangestatusDto,@Param('uid') uid: string,@Request() req) {
    return this.changestatusService.uid(createChangestatusDto,uid,req.user);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changestatusService.remove(+id);
  }
}
