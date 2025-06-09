import { Module } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostUseCase } from './use-case/create-post.use-case';
import { GetPostsUseCase } from './use-case/get-posts.use-case';
import { GetPostUseCase } from './use-case/get-post.use-case';
import { UpdatePostUseCase } from './use-case/update-post.use-case';
import { RemovePostUseCase } from './use-case/remove-post.use-case';
import { CreateCommentUseCase } from './use-case/create-comment.use-case';
import { UpdateCommentUseCase } from './use-case/update-comment.use-case';
import { RemoveCommentUseCase } from './use-case/remove-comment.use-case';
import { GetMyPostsUseCase } from './use-case/get-my-posts.use-cast';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity])],
  providers: [
    GetPostsUseCase,
    GetPostUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    RemovePostUseCase,
    CreateCommentUseCase,
    UpdateCommentUseCase,
    RemoveCommentUseCase,
    GetMyPostsUseCase,
  ],
  exports: [
    GetPostsUseCase,
    GetPostUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    RemovePostUseCase,
    CreateCommentUseCase,
    UpdateCommentUseCase,
    RemoveCommentUseCase,
    GetMyPostsUseCase,
  ],
})
export class PostModule {}
