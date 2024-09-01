import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ProductPayload {
  @ApiProperty({
    example: 'Handcrafted Wooden Bacon',
    description: 'Product Name',
  })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'voluptatibus ad quia',
    description: 'Product Description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 2000,
    description: 'Product Price',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 12,
    description: 'Product Quantity',
  })
  @IsNotEmpty()
  quantity: number;
}
