import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from header
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    });
  }

  async validate(payload: any) {
    // Find the user using payload data
    const user = await this.usersService.findUserByEmail(payload.email);

    // If user not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Return user details for authenticated requests
    return { userId: payload.sub, email: payload.email };
  }
}
