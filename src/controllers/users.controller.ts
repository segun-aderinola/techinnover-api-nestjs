import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { JwtAuthGuard } from '../middlewares/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users
  @Post()
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.userService.createUser(body.name, body.email, body.password);
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
