import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ValidateLoginPayload {
  @ApiProperty({
    example: 'hello@gmail.com',
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Test123',
    description: 'password',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
