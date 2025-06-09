import { Module } from '@nestjs/common';
import { PostModule } from 'src/modules/post/post.module';
import { PostController } from './post.controller';
import { CommentController } from './comment.controller';
import { OurBlogController } from './our-blog.controller';

@Module({
  imports: [PostModule],
  controllers: [PostController, CommentController, OurBlogController],
})
export class PostPresentationModule {}
