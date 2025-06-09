import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from 'src/common/constants/response-messages.constants';
import { ApiPaginatedResponse } from 'src/common/decorators/pagination.decorator';
import { PageDto } from 'src/common/dtos/page.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { getUserContext } from 'src/common/utilities/request-context.utility';
import { PaginationInterceptor } from 'src/infrastructure/interceptors/pagination.interceptor';
import { GetMyPostsUseCase } from 'src/modules/post/use-case/get-my-posts.use-cast';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Our Posts')
@Controller('our-posts')
export class OurBlogController {
  constructor(private readonly gets: GetMyPostsUseCase) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  @ApiPaginatedResponse(PageDto)
  public async getPosts(@Query() pagination: PaginationDto) {
    const userContext = getUserContext();
    const data = await this.gets.execute(userContext.user.id, pagination);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }
}
