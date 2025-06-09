import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

export interface PaginationMetaDtoParameters {
  pagination: PaginationDto;
  count: number;
}

export class PaginationMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pagination, count }: PaginationMetaDtoParameters) {
    this.page = pagination.page;
    this.pageSize = pagination.pageSize > 0 ? pagination.pageSize : count;
    this.total = count;
    this.pageCount = Math.ceil(this.total / this.pageSize) || 1;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
