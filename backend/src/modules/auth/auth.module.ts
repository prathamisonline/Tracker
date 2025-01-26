import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';  // To import users service
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,  // Importing Users Module to interact with user data
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // JWT secret from env variables
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },  // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
