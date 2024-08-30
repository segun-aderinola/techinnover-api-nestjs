import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { JwtAuthGuard } from '../middlewares/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../models/user.entity';
import { ValidateSignUpPayload } from 'src/validators/userSignUp.validate';
import { successResponse, errorResponse } from '../utils/response.util';
import { ValidateLoginPayload } from 'src/validators/userLogin.validate copy';
import { AuthService } from 'src/services/auth.service';
import { Response, Request } from 'express';
import { JwtMiddleware } from 'src/middlewares/jwtMiddleware';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // POST /users/signup
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() validateSignUpPayload: ValidateSignUpPayload,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.createUser(
        validateSignUpPayload,
        res,
      );
      return successResponse(res, 'User registered successfully', result);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // POST /users/login
  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() validateLoginPayload: ValidateLoginPayload,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.login(validateLoginPayload);
      return successResponse(res, 'Login successful', result);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // GET /users
  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAllUsers();
      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // POST /users/:id/ban
  @Post(':id/ban-and-unban')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(UserRole.ADMIN)
  async banUser(
    @Query() query: any,
    @Param('id') id: number,
    @Res() res: Response,
    req: Request,
  ) {
    try {
      const { action } = query;
      //console.log(action);
      if (!action) {
        return errorResponse(res, 'Query action is required');
      }
      if (action != 'unban' && action != 'ban') {
        return errorResponse(
          res,
          'Invalid query value. Query string must be ban or unban',
        );
      }
      await this.userService.banAndUnbanUser(id, action, res);
      return successResponse(res, 'User ' + action + 'ned successfully', null);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // POST /users/:id/unban
  // @Post(':id/unban')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  // async unbanUser(@Param('id') id: number, @Res() res: Response) {
  //   try {
  //     await this.userService.unbanUser(id);
  //     return successResponse(res, 'User unbanned successfully', null);
  //   } catch (error) {
  //     return errorResponse(res, error.message);
  //   }
  // }
}
