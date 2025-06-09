import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PostCategory } from '../entities/post.entity';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(PostCategory)
  category?: PostCategory;
}
