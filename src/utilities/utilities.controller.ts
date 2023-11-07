import { Controller, Get, Body, UseGuards,Request, Param, Post } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { AuthGuard } from '../auth/jwt.guard';
import { CreateUtiliesDto } from './dto/create-utilidade.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('utilities')
@Controller('utilities')
export class UtilitiesController {
  dispersionesService: any;
  constructor(private readonly utilitiesService: UtilitiesService) {}



  @UseGuards(AuthGuard)
  @Post(':country')
  @ApiCreatedResponse({description:'the record has beed successfully created'})
  @ApiForbiddenResponse({description:'forbidden'})
  utilities(@Body() createUtiliesDto: CreateUtiliesDto,@Request() req, @Param('country') country: string) {
    return this.utilitiesService.utilities(createUtiliesDto,req.user,country);
  }

}
