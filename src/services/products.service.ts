import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { User } from '../models/user.entity';
import { Response } from 'express';
import { errorResponse, successResponse } from 'src/utils/response.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(
    name: string,
    description: string,
    price: number,
    owner: User,
    res: Response,
  ): Promise<void> {
    const product = this.productRepository.create({
      name,
      description,
      price,
      user_id: owner.id,
      owner,
    });
    const save = this.productRepository.save(product);
    return successResponse(res, 'Product created successfully', product);
  }

  async findAllApprovedProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { approved: true } });
  }

  async findAllProducts(owner: User, res: Response) {
    const product = await this.productRepository.find({
      where: { user_id: owner.id },
    });
    return successResponse(res, 'Product retrieved successfully', product);
  }

  async updateProduct(
    id: number,
    updateData: Partial<Product>,
    owner: User,
    res: Response,
  ): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id, owner },
    });
    if (!product) {
      return errorResponse(res, 'Product not found');
    }
    Object.assign(product, updateData);
    const save = this.productRepository.save(product);
    return successResponse(res, 'Product updated successfully', product);
  }

  async deleteProduct(id: number, owner: User, res: Response): Promise<void> {
    const result = await this.productRepository.delete({ id, owner });
    if (result.affected === 0) {
      return errorResponse(res, 'Product not found');
    }
    return successResponse(res, 'Product has been deleted successfully', null);
  }

  async approveProduct(
    user: User,
    product_id: number,
    res: Response,
  ): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: product_id, user_id: user.id },
    });
    if (!product) {
      return errorResponse(res, 'Product not found');
    }
    product.approved = true;

    await this.productRepository.save(product);
    return successResponse(
      res,
      'Product has been approved successfully',
      product,
    );
  }
}
