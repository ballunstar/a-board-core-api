import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionAutoSeedUseCase } from './use-case/permission-auto-seed.use-case';
import { PermissionCheckIsAllowUseCase } from './use-case/permission-check-is-allow.use-case';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { GetPermissionsWithCrudUseCase } from './use-case/get-permissions-with-crud.use-case';
import { PermissionGroupAutoSeedUseCase } from './use-case/permission-group-auto-seed.use-case';
import { PermissionGroupRepository } from './repositories/permission-group.repository';
import { PermissionGroupEntity } from './entities/permission-group.entity';
import { GetPermissionsWithCRUDGroupUseCase } from './use-case/get-permissions-with-crud-group.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, UserEntity, PermissionGroupEntity])],
  providers: [
    PermissionRepository,
    PermissionGroupRepository,
    UserRepository,
    PermissionAutoSeedUseCase,
    PermissionGroupAutoSeedUseCase,
    PermissionCheckIsAllowUseCase,
    GetPermissionsWithCrudUseCase,
    GetPermissionsWithCRUDGroupUseCase,
  ],
  exports: [
    PermissionRepository,
    PermissionGroupRepository,
    PermissionAutoSeedUseCase,
    PermissionGroupAutoSeedUseCase,
    PermissionCheckIsAllowUseCase,
    GetPermissionsWithCrudUseCase,
    GetPermissionsWithCRUDGroupUseCase,
  ],
})
export class PermissionModule {}
