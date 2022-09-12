import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body('user') dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body('user') dto: CreateUserDto) {
    return this.authService.login(dto);
  }
}
