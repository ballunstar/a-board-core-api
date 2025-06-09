import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { queryBuilderWithPagination } from 'src/common/utilities/datasource.utility';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class GetMyPostsUseCase {
  constructor(private readonly dataSource: DataSource) {}
  async execute(userId: number, pagination: PaginationDto) {
    const queryBuilder = this.dataSource
      .createQueryBuilder(PostEntity, 'posts')
      .leftJoinAndSelect('posts.author', 'author')
      .orderBy('posts.createdAt', 'DESC')
      .where('author.id = :userId', { userId });

    const filterableFields = PostEntity.filterableFields;
    const sortableFields = PostEntity.sortableFields;

    const [data, count] = await queryBuilderWithPagination<PostEntity>(
      queryBuilder,
      pagination,
      ['posts.id', 'posts.category', 'posts.title', 'author.firstName', 'author.lastName', 'posts.content'],
      filterableFields,
      sortableFields,
    ).getManyAndCount();

    const pageMetaDto = new PaginationMetaDto({ count, pagination });

    return new PageDto(data, pageMetaDto);
  }
}
