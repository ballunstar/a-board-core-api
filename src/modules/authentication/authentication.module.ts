import { Module } from '@nestjs/common';
import { CredentialModule } from '../credential/credential.module';
import { LoginUseCase } from './use-cases/login.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';

@Module({
  imports: [CredentialModule],
  providers: [LoginUseCase, LogoutUseCase],
  exports: [LoginUseCase, LogoutUseCase],
})
export class AuthenticationModule {}
