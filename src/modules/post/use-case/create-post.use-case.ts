import { DataSource } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PostCategory, PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, data: CreatePostDto) {
    return this.dataSource.transaction(async (manager) => {
      const { title, content, category } = data;

      if (!Object.values(PostCategory).includes(category)) {
        throw new BadRequestException('Invalid category');
      }
      const post = new PostEntity();
      post.title = title;
      post.content = content;
      post.category = category;
      post.author = user;

      const savedPost = await manager.save(post);
      return savedPost.toAPIResponse();
    });
  }
}
