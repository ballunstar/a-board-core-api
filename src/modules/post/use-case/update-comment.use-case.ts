import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UpdateCommentDto } from '../dtos/update-comment.dto';

@Injectable()
export class UpdateCommentUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, commentId: number, dto: UpdateCommentDto): Promise<any> {
    return this.dataSource.transaction(async (manager) => {
      const comment = await manager.findOne(CommentEntity, {
        where: { id: commentId },
        relations: ['author'],
      });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      if (comment.author.id !== user.id) {
        throw new ForbiddenException('You are not allowed to update this comment');
      }

      comment.content = dto.content ?? comment.content;

      const updated = await manager.save(comment);
      return updated.toAPIResponse();
    });
  }
}
