import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateAliadoDto } from './dto/create-aliado.dto';
import { UpdateAliadoDto } from './dto/update-aliado.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt.guard';

@ApiTags('merchant')
@Controller('merchant')
export class MerchantController {
  constructor(private readonly aliadoService: MerchantService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAliadoDto: CreateAliadoDto) {
    return this.aliadoService.create(createAliadoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.aliadoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aliadoService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Get('find/:country')
  findcountry(@Param('country') country: string) {
    return this.aliadoService.country(country);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:country')
  Profile(@Request() req,@Param('country') country: string) {
    return this.aliadoService.profile(req.user,country);
  }


  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAliadoDto: UpdateAliadoDto) {
    return this.aliadoService.update(+id, updateAliadoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aliadoService.remove(+id);
  }
}
