import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ValidateSignUpPayload {
  @ApiProperty({
    example: 'John Snow',
    description: 'Username',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'hello@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Test123',
    description: 'User password',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
