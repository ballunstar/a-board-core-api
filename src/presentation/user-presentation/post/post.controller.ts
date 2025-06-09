import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from 'src/common/constants/response-messages.constants';
import { PageDto } from 'src/common/dtos/page.dto';
import { getUserContext } from 'src/common/utilities/request-context.utility';
import { PaginationInterceptor } from 'src/infrastructure/interceptors/pagination.interceptor';
import { CreatePostDto } from 'src/modules/post/dtos/create-post.dto';
import { CreatePostUseCase } from 'src/modules/post/use-case/create-post.use-case';
import { GetPostsUseCase } from 'src/modules/post/use-case/get-posts.use-case';
import { ApiPaginatedResponse } from './../../../common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { GetPostUseCase } from 'src/modules/post/use-case/get-post.use-case';
import { UpdatePostDto } from 'src/modules/post/dtos/update-post.dto';
import { UpdatePostUseCase } from 'src/modules/post/use-case/update-post.use-case';
import { RemovePostUseCase } from 'src/modules/post/use-case/remove-post.use-case';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly gets: GetPostsUseCase,
    private readonly get: GetPostUseCase,
    private readonly create: CreatePostUseCase,
    private readonly update: UpdatePostUseCase,
    private readonly remove: RemovePostUseCase, // Assuming you have a DeletePostUseCase
  ) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  @ApiPaginatedResponse(PageDto)
  public async getPosts(@Query() pagination: PaginationDto) {
    const data = await this.gets.execute(pagination);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Get(':postId')
  @HttpCode(200)
  public async getPost(@Param('postId') postId: string) {
    const userContext = getUserContext();
    const data = await this.get.execute(Number(postId));
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreatePostDto })
  public async createPost(@Body() createPostDto: CreatePostDto) {
    const userContext = getUserContext();
    const data = await this.create.execute(userContext.user, createPostDto);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Put(':postId')
  @HttpCode(200)
  @ApiBody({ type: UpdatePostDto })
  public async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto) {
    const userContext = getUserContext();
    const data = await this.update.execute(userContext.user, Number(postId), updatePostDto);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Delete(':postId')
  @HttpCode(200)
  public async removePost(@Param('postId') postId: string) {
    const userContext = getUserContext();
    await this.remove.execute(userContext.user, Number(postId));
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
    };
  }
}
