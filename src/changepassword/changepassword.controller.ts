import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { ChangepasswordService } from './changepassword.service';
import { CreateChangepasswordDto } from './dto/create-changepassword.dto';
import { UpdateChangepasswordDto } from './dto/update-changepassword.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('changepassword')
export class ChangepasswordController {
  constructor(private readonly changepasswordService: ChangepasswordService) {}

  @Post()
  create(@Body() createChangepasswordDto: CreateChangepasswordDto) {
    return this.changepasswordService.create(createChangepasswordDto);
  }

  @Get()
  findAll() {
    return this.changepasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changepasswordService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req, @Body() createChangepasswordDto: CreateChangepasswordDto) {
    return this.changepasswordService.update(req.user, createChangepasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changepasswordService.remove(+id);
  }
}
