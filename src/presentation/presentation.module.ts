import { Module } from '@nestjs/common';
import { AuthPresentationModule } from './auth/auth.module';
import { RolePresentationModule } from './role/role.module';
import { UserPresentationModule } from './user-presentation/user-presentation.module';

@Module({
  imports: [AuthPresentationModule, RolePresentationModule, UserPresentationModule],
  exports: [AuthPresentationModule, RolePresentationModule, UserPresentationModule],
})
export class PresentationModule {}
