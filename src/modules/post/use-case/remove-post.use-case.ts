import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class RemovePostUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, postId: number): Promise<{ success: boolean }> {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(PostEntity, {
        where: { id: postId },
        relations: ['author'],
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.author.id !== user.id) {
        throw new ForbiddenException('You are not allowed to delete this post');
      }

      await manager.remove(PostEntity, post);

      return { success: true };
    });
  }
}
