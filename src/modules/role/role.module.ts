import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from '../permission/repositories/permission.repository';
import { PermissionEntity } from '../permission/entities/permission.entity';
import { PermissionGroupRepository } from '../permission/repositories/permission-group.repository';
import { PermissionGroupEntity } from '../permission/entities/permission-group.entity';
import { CheckRoleIsUsedUseCase } from './use-cases/check-roleis-used.use-case';
import { SeederDefaultRoleUseCase } from './use-cases/seeder-default-role.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity, PermissionGroupEntity])],
  providers: [RoleRepository, PermissionRepository, PermissionGroupRepository, CheckRoleIsUsedUseCase, SeederDefaultRoleUseCase],
  exports: [RoleRepository, CheckRoleIsUsedUseCase, SeederDefaultRoleUseCase],
})
export class RoleModule {}
