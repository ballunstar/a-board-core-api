import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostEntity, PostCategory } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, postId: number, data: UpdatePostDto) {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(PostEntity, { where: { id: postId }, relations: ['author'] });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.author.id !== user.id) {
        throw new ForbiddenException('You are not the author of this post');
      }

      if (data.category && !Object.values(PostCategory).includes(data.category)) {
        throw new BadRequestException('Invalid category');
      }

      // Only update if value is provided
      post.title = data.title ?? post.title;
      post.content = data.content ?? post.content;
      post.category = data.category ?? post.category;

      const updatedPost = await manager.save(post);
      return updatedPost.toAPIResponse();
    });
  }
}
