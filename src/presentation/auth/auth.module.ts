import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthenticationModule],
  controllers: [AuthController],
})
export class AuthPresentationModule {}
