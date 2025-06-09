import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
