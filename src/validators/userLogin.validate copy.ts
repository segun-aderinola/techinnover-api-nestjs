import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ValidateLoginPayload {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
