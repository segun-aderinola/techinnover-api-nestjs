import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Request, Response } from 'express';
import { successResponse } from 'src/utils/response.util';
import { JwtMiddleware } from 'src/middlewares/jwtMiddleware';
import { ProductPayload } from './dto/create-product-payload';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get all approved products' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Product retrieved successfully.',
        data: [
          {
            id: 4,
            user_id: 3,
            name: 'Handcrafted Wooden Bacon',
            description: 'voluptatibus ad quia',
            price: '277.48',
            quantity: 10,
          },
        ],
      },
    },
  })
  async findAllApproved(@Res() res: Response) {
    const products = await this.productService.findAllApprovedProducts();
    return successResponse(
      res,
      'Approved products retrieved successfully',
      products,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Product retrieved successfully.',
        data: [
          {
            id: 4,
            user_id: 3,
            name: 'Handcrafted Wooden Bacon',
            description: 'voluptatibus ad quia',
            price: '277.48',
            quantity: 10,
          },
        ],
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtMiddleware)
  async findAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return this.productService.findAllProducts(user, res);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 200,
    description: 'Product created successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Product created successfully.',
        data: {
          user_id: 3,
          name: 'Handcrafted Wooden Bacon',
          description: 'voluptatibus ad quia',
          price: '277.48',
          owner: {
            id: 3,
            email: 'aderinolasegun9@gmail.com',
            role: 'admin',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: ProductPayload })
  @ApiBearerAuth()
  @UseGuards(JwtMiddleware)
  async create(
    @Body() productPayload: ProductPayload,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.createProduct(productPayload, user, res);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Product created successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Product created successfully.',
        data: {
          user_id: 3,
          name: 'Handcrafted Wooden Bacon',
          description: 'voluptatibus ad quia',
          price: '277.48',
          owner: {
            id: 3,
            email: 'aderinolasegun9@gmail.com',
            role: 'admin',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Product not found',
    schema: {
      example: {
        status: 'error',
        message: 'Product not found',
        data: null,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtMiddleware)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the product to update',
  })
  async update(
    @Param('id') id: number,
    @Body() productPayload: ProductPayload,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.updateProduct(id, productPayload, user, res);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'Product has been deleted successfully',
    schema: {
      example: {
        status: 'success',
        message: 'Product has been deleted successfully',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Product not found',
    schema: {
      example: {
        status: 'error',
        message: 'Product not found',
        data: null,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the product to delete',
  })
  async delete(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.deleteProduct(id, user, res);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a product' })
  @ApiResponse({
    status: 200,
    description: 'Product has been approved successfully.',
    schema: {
      example: {
        status: 'success',
        message: 'Product has been approved successfully.',
        data: {
          id: 4,
          user_id: 3,
          name: 'Handcrafted Wooden Bacon',
          description: 'voluptatibus ad quia',
          price: '277.48',
          quantity: 12,
          approved: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Product not found',
    schema: {
      example: {
        status: 'error',
        message: 'Product not found',
        data: null,
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the product to approve',
  })
  async approve(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.approveProduct(user, id, res);
  }
}
