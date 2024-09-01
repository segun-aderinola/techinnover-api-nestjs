import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ValidateLoginPayload } from 'src/users/dto/user-login-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid Email address');
    }
    if (user.isBanned) {
      throw new ForbiddenException(
        'Your account has been banned. Please contact the admin',
      );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid Password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(
    loginRequest: ValidateLoginPayload,
  ): Promise<{ user: any; token: string }> {
    const user = await this.validateUser(
      loginRequest.email,
      loginRequest.password,
    );
    const token = this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role, id: user.id },
      {
        secret: process.env.JWT_SECRET, // The secret should be properly configured in the JwtModule
      },
    );
    return { user, token };
  }
}
