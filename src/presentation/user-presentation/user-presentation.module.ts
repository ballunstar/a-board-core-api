import { Module } from '@nestjs/common';
import { UserAuthPresentationModule } from './auth/user-auth-presentation.module';
import { UserProfilePresentationModule } from './user/user-presentation.module';
import { UserModule } from 'src/modules/user/user.module';
import { PostPresentationModule } from './post/post.presentation.module';

@Module({
  imports: [UserModule, UserAuthPresentationModule, UserProfilePresentationModule, PostPresentationModule],
  controllers: [],
})
export class UserPresentationModule {}
