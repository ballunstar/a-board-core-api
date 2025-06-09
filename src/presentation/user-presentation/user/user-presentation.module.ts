import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AuthenticationModule, UserModule],
  controllers: [UserController],
})
export class UserProfilePresentationModule {}
