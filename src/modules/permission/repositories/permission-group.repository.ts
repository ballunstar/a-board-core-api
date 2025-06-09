import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionGroupEntity } from '../entities/permission-group.entity';

@Injectable()
export class PermissionGroupRepository extends Repository<PermissionGroupEntity> {
  constructor(
    @InjectRepository(PermissionGroupEntity)
    repository: Repository<PermissionGroupEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
