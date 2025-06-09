import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class GetPostUseCase {
  constructor(private readonly dataSource: DataSource) {}
  async execute(postId: number) {
    const queryBuilder = this.dataSource
      .createQueryBuilder(PostEntity, 'posts')
      .leftJoinAndSelect('posts.author', 'author')
      .leftJoinAndSelect('posts.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentAuthor')
      .where('posts.id = :postId', { postId });

    const data = await queryBuilder.getOne();
    if (!data) {
      throw new BadRequestException('Post not found');
    }

    return data.toAPIResponse();
  }
}
