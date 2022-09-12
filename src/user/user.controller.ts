import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body('user') dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get('by-name/:name')
  getUserByName(@Param('email') name: string) {
    return this.userService.getUserByName(name);
  }

  @Get('by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  // updateUser(){}
}
