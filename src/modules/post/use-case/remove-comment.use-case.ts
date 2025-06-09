import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class RemoveCommentUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, commentId: number): Promise<{ success: boolean }> {
    return this.dataSource.transaction(async (manager) => {
      const comment = await manager.findOne(CommentEntity, {
        where: { id: commentId },
        relations: ['author', 'post'],
      });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      if (comment.author.id !== user.id) {
        throw new ForbiddenException('You are not allowed to delete this comment');
      }

      comment.post.commentCount -= 1;
      await manager.save(comment.post);

      await manager.remove(CommentEntity, comment);

      return { success: true };
    });
  }
}
