import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { queryBuilderWithPagination } from 'src/common/utilities/datasource.utility';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class GetPostsUseCase {
  constructor(private readonly dataSource: DataSource) {}
  async execute(pagination: PaginationDto) {
    const queryBuilder = this.dataSource.createQueryBuilder(PostEntity, 'posts').leftJoinAndSelect('posts.author', 'author').orderBy('posts.createdAt', 'DESC');

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
