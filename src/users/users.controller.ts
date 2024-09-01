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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from './entities/user.entity';
import { ValidateSignUpPayload } from 'src/users/dto/user-signup-payload';
import { successResponse, errorResponse } from '../utils/response.util';
import { ValidateLoginPayload } from 'src/users/dto/user-login-payload';
import { AuthService } from 'src/auth/auth.service';
import { Response, Request } from 'express';
import { JwtMiddleware } from 'src/middlewares/jwtMiddleware';

@ApiTags('Users') // Tags the endpoints in Swagger UI under "Users"
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // POST /users/signup
  @Post('/signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    schema: {
      example: {
        status: 'success',
        message: 'User registered successfully',
        data: {
          name: 'Dillan.Wyman',
          email: 'aderinolasegun9@gmail.com',
          password:
            '$2b$10$z1ib8Ozzh1teIaQ8qXJYbOr.qPTDPQryLbTBlTqOHwkh8dLrGFieq',
          id: 3,
          role: 'user',
          isBanned: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already in use',
    schema: {
      example: {
        status: 'error',
        message: 'Email already in use',
        data: null,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: ValidateSignUpPayload })
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
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        status: 'success',
        message: 'Login successful',
        data: {
          user: {
            id: 3,
            name: 'Dillan.Wyman',
            email: 'aderinolasegun9@gmail.com',
            role: 'user',
            isBanned: false,
          },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZXJpbm9sYXNlZ3VuOUBnbWFpbC5jb20iLCJzdWIiOjMsImlhdCI6MTcyNDk3OTgwMH0.UdnnJzkKA0Swd4oDW-5QY0r_UNSUbrU4JoCLl45Patw',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Your account has been banned. Please contact the admin',
    schema: {
      example: {
        status: 'error',
        message: 'Your account has been banned. Please contact the admin',
        data: null,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
  @ApiBody({ type: ValidateLoginPayload })
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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    schema: {
      example: {
        status: 'success',
        message: 'Users retrieved successfully',
        data: [
          {
            id: 3,
            name: 'Dillan.Wyman',
            email: 'aderinolasegun9@gmail.com',
            role: 'user',
            isBanned: false,
          },
        ],
      },
    },
  })
  @ApiBearerAuth()
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

  // POST /users/:id/ban-and-unban
  @Post(':id/ban-and-unban')
  @ApiOperation({ summary: 'Ban or unban a user' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the user' })
  @ApiQuery({
    name: 'action',
    required: true,
    description: 'Action to perform: ban or unban',
  })
  @ApiResponse({
    status: 200,
    description: 'User unbanned successfully',
    schema: {
      example: {
        status: 'success',
        message: 'User unbanned successfully',
        data: null,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid action provided.' })
  @ApiBearerAuth()
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
      if (!action) {
        return errorResponse(res, 'Query action is required');
      }
      if (action !== 'unban' && action !== 'ban') {
        return errorResponse(
          res,
          'Invalid query value. Query string must be "ban" or "unban"',
        );
      }
      await this.userService.banAndUnbanUser(id, action, res);
      return successResponse(res, `User ${action}ned successfully`, null);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}
