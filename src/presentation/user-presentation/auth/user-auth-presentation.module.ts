import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [UserAuthController],
})
export class UserAuthPresentationModule {}
