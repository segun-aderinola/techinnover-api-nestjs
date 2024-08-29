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
} from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { JwtAuthGuard } from '../middlewares/auth.guard';
import { RolesGuard } from '../middlewares/roles.guard';
import { Roles } from '../middlewares/roles.decorator';
import { UserRole } from '../models/user.entity';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('public')
  async findAllApproved() {
    return this.productService.findAllApprovedProducts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: { name: string; description: string; price: number },
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.productService.createProduct(
      body.name,
      body.description,
      body.price,
      user,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string; price?: number },
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.productService.updateProduct(id, body, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Req() req: Request) {
    const user = req.user;
    return this.productService.deleteProduct(id, user);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async approve(@Param('id') id: number) {
    return this.productService.approveProduct(id);
  }
}
