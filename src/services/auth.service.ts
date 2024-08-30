import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/users.service';
import * as bcrypt from 'bcrypt';
import { errorResponse, successResponse } from 'src/utils/response.util';
import { ValidateLoginPayload } from 'src/validators/userLogin.validate copy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (
      user &&
      !user.isBanned &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return errorResponse('Invalid credential');
  }

  async login(loginRequest: ValidateLoginPayload) {
    const user = await this.validateUser(
      loginRequest.email,
      loginRequest.password,
    );
    const jwtSecret = process.env.JWT_SECRET;
    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: jwtSecret,
      },
    );
    return successResponse('Login Successful', { user, token });
  }
}
