import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { LoginDashService } from './login_dash.service';
import { CreateLoginDashDto } from './dto/create-login_dash.dto';
import { UpdateLoginDashDto } from './dto/update-login_dash.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('login-dash')
@Controller('login-dash')
export class LoginDashController {
  constructor(private readonly loginDashService: LoginDashService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  create(@Body() createLoginDashDto: CreateLoginDashDto) {
    return this.loginDashService.create(createLoginDashDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.loginDashService.findAll();
  }


 

  
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginDashService.findOne(+id);
  }



   

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDashDto: UpdateLoginDashDto) {
    return this.loginDashService.update(+id, updateLoginDashDto);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginDashService.remove(+id);
  }
}
