import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register user and return JWT tokens
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // Login user and return JWT tokens
  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // Refresh access token using refresh token
  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refreshAccessToken(refreshDto.refreshToken);
  }
}
