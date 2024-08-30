import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'techinnover',
    });
  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload);
    const user: any = this.userService.findUserById(payload.sub);
    if (!user) {
      console.log('User not found in database');
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
