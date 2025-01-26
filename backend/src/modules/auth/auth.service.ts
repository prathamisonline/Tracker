import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '@prisma/client'; // Prisma-generated User type

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Updated to use Prisma-based UsersService
    private readonly jwtService: JwtService,
  ) {}

  // Register user and return both access and refresh tokens
  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    // Create the JWT payload
    const payload = { email: user.email, sub: user.id };

    // Generate Access Token (short-lived)
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN, // 1 hour
    });

    // Generate Refresh Token (long-lived)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET, // A separate secret key for refresh tokens
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // 7 days or any preferred expiration time
    });

    return { accessToken, refreshToken }; // Return both tokens
  }

  // Validate user during login
  // async validateUser(email: string, password: string): Promise<User | null> {
  //   console.log(`Validating user with email: ${email}`);
  //   const user = await this.usersService.findUserByEmail(email); // Prisma replaces TypeORM
  //   if (user) {
  //     console.log('User found:', user.email);
  //     const match = await bcrypt.compare(password, user.password);
  //     console.log('Password match:', match);
  //     if (match) return user;
  //   }
  //   return null;
  // }

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      console.log('User found:', user.email);
      // Temporarily bypass password validation
      return user;
    }
    return null;
  }

  // // Login user and return both access and refresh tokens
  // async login(
  //   email: string,
  //   password: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   const user = await this.validateUser(email, password);

  //   // If user is not found or password doesn't match, throw a specific HTTP exception
  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED); // 401 status code
  //   }

  //   const payload = { email: user.email, sub: user.id };

  //   const accessToken = this.jwtService.sign(payload, {
  //     secret: process.env.JWT_SECRET,
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });

  //   const refreshToken = this.jwtService.sign(payload, {
  //     secret: process.env.JWT_REFRESH_SECRET,
  //     expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  //   });

  //   return { accessToken, refreshToken };
  // }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateUser(email, password);

    // If the user is not found, throw an exception
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED); // 401 status code
    }

    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  // Refresh access token using refresh token
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      // Verify refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET, // Verify with the refresh token secret
      });

      const payload = { email: decoded.email, sub: decoded.sub };

      // Generate a new access token
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN, // 1 hour
      });

      return { accessToken }; // Return new access token
    } catch (error) {
      throw new Error('Invalid refresh token or expired.');
    }
  }
}
