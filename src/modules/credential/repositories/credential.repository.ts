import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CredentialEntity } from '../entities/credential.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CredentialRepository extends Repository<CredentialEntity> {
  constructor(
    @InjectRepository(CredentialEntity)
    repository: Repository<CredentialEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
