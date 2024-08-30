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
import { ProductService } from '../services/products.service';
import { JwtAuthGuard } from '../middlewares/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../models/user.entity';
import { Request, Response } from 'express';
import { JwtMiddleware } from 'src/middlewares/jwtMiddleware';
import { successResponse } from 'src/utils/response.util';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('public')
  async findAllApproved(@Res() res: Response) {
    const product = await this.productService.findAllApprovedProducts();
    return successResponse(res, 'Product retrieved successfully', product);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    // console.log(user);
    return this.productService.findAllProducts(user, res);
  }

  @Post()
  async create(
    @Body() body: { name: string; description: string; price: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.createProduct(
      body.name,
      body.description,
      body.price,
      user,
      res,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string; price?: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.updateProduct(id, body, user, res);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.deleteProduct(id, user, res);
  }

  @Post(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async approve(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.productService.approveProduct(user, id, res);
  }
}
