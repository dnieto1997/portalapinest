import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from '../auth/jwt.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

 
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.permissionService.findAll(req.user);
  }

 
}
