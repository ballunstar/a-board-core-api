import { Body, ClassSerializerInterceptor, Controller, Delete, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from 'src/common/constants/response-messages.constants';
import { getUserContext } from 'src/common/utilities/request-context.utility';
import { CreateCommentUseCase } from 'src/modules/post/use-case/create-comment.use-case';
import { CreateCommentDto } from 'src/modules/post/dtos/create-comment.dto';
import { UpdateCommentUseCase } from 'src/modules/post/use-case/update-comment.use-case';
import { UpdateCommentDto } from 'src/modules/post/dtos/update-comment.dto';
import { RemoveCommentUseCase } from 'src/modules/post/use-case/remove-comment.use-case';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Comment')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly create: CreateCommentUseCase,
    private readonly update: UpdateCommentUseCase,
    private readonly remove: RemoveCommentUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreateCommentDto })
  public async createPost(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto) {
    const userContext = getUserContext();
    const data = await this.create.execute(userContext.user, Number(postId), createCommentDto);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Put(':commentId')
  @HttpCode(200)
  @ApiBody({ type: UpdateCommentDto })
  public async updatePost(@Param('postId') postId: string, @Param('commentId') commentId: string, @Body() updatePostDto: UpdateCommentDto) {
    const userContext = getUserContext();
    const data = await this.update.execute(userContext.user, Number(commentId), updatePostDto);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Delete(':commentId')
  @HttpCode(200)
  public async removePost(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    const userContext = getUserContext();
    await this.remove.execute(userContext.user, Number(commentId));
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
    };
  }
}
