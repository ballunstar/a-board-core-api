import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './entities/credential.entity';
import { CredentialRepository } from './repositories/credential.repository';
import { VerifyCredentialUseCase } from '../authentication/use-cases/verify-credential.use-case';
import { VerifyUserCredentialUseCase } from '../authentication/use-cases/verify-user-credential.use-case';
import { CreateCredentialUseCase } from './use-case/create-credential.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity])],
  providers: [CredentialRepository, VerifyCredentialUseCase, VerifyUserCredentialUseCase, CreateCredentialUseCase],
  exports: [CredentialRepository, VerifyCredentialUseCase, VerifyUserCredentialUseCase, CreateCredentialUseCase],
})
export class CredentialModule {}
