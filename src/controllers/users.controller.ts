import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { JwtAuthGuard } from '../middlewares/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../models/user.entity';
import { ValidateSignUpPayload } from 'src/validators/userSignUp.validate';
import { successResponse } from '../utils/response.util';
import { ValidateLoginPayload } from 'src/validators/userLogin.validate copy';
import { AuthService } from 'src/services/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // POST /users
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() validateSignUpPayload: ValidateSignUpPayload) {
    return this.userService.createUser(validateSignUpPayload);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() validateLoginPayload: ValidateLoginPayload) {
    return this.authService.login(validateLoginPayload);
  }

  // GET /users
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.userService.findAllUsers();
  }

  // POST /users/:id/ban
  @Post(':id/ban')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async banUser(@Param('id') id: number) {
    return this.userService.banUser(id);
  }

  // POST /users/:id/unban
  @Post(':id/unban')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async unbanUser(@Param('id') id: number) {
    return this.userService.unbanUser(id);
  }
}

function findAll() {
  throw new Error('Function not implemented.');
}
