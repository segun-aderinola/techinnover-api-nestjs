import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { User } from '../models/user.entity';

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
  ): Promise<Product> {
    const product = this.productRepository.create({
      name,
      description,
      price,
      owner,
    });
    return this.productRepository.save(product);
  }

  async findAllApprovedProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { approved: true } });
  }

  async updateProduct(
    id: number,
    updateData: Partial<Product>,
    owner: User,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, owner },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateData);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number, owner: User): Promise<void> {
    const result = await this.productRepository.delete({ id, owner });
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async approveProduct(userId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: userId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.approved = true;
    return this.productRepository.save(product);
  }
}
