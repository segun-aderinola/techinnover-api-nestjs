import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.userService.createUser(body.name, body.email, body.password);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Post(':id/ban')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async banUser(@Param('id') id: number) {
    return this.userService.banUser(id);
  }

  @Post(':id/unban')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async unbanUser(@Param('id') id: number) {
    return this.userService.unbanUser(id);
  }
}
