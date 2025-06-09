import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, {
    message: 'name must contain only letters, numbers, and spaces',
  })
  name: string;

  @ApiProperty({
    description: 'A brief description of the role',
    example: 'Role for administrators with full access',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'List of permissions associated with the role',
    example: ['CREATE_USER', 'DELETE_USER', 'UPDATE_USER'],
    type: [String],
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  permissions: string[];
}
