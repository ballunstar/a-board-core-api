import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Injectable()
export class CreateCommentUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(user: UserEntity, postId: number, dto: CreateCommentDto) {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(PostEntity, { where: { id: postId } });

      if (!post) {
        throw new BadRequestException('Post not found');
      }

      const comment = manager.create(CommentEntity, {
        content: dto.content,
        post,
        author: user,
      });

      post.commentCount += 1;
      await manager.save(post);

      const saved = await manager.save(comment);
      return saved.toAPIResponse();
    });
  }
}
