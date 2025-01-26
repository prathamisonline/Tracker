// import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('register')
//   async register(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.createUser(createUserDto);
//   }

//   @Get(':email')
//   async getUser(@Param('email') email: string) {
//     return this.usersService.findUserByEmail(email);
//   }
// }

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';  // Import Prisma User type

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {  // Define return type as User
    return this.usersService.createUser(createUserDto);
  }

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User | null> {  // Define return type as User | null
    return this.usersService.findUserByEmail(email);
  }
}
