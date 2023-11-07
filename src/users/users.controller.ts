import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseController } from 'src/database/shared/base.controller';
import { User } from 'src/database/entities/user.entity';

@Controller('users')
export class UsersController extends BaseController<User>{
  constructor(public readonly service: UsersService) {
    super(service)
  }

  
}

