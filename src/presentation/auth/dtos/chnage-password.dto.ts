import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  // @MinLength(8, { message: 'Current password must be at least 8 characters long' })
  // @MaxLength(50, { message: 'Current password must not exceed 50 characters' })
  // @ApiProperty({
  //   type: 'string',
  //   example: '',
  //   name: 'currentPassword',
  // })
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  // @MinLength(8, { message: 'New password must be at least 8 characters long' })
  // @MaxLength(50, { message: 'New password must not exceed 50 characters' })
  // @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$/, {
  //   message: 'New password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  // })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '',
    name: 'newPassword',
  })
  newPassword: string;
}
