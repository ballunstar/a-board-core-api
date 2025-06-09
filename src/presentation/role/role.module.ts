import { Module } from '@nestjs/common';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleModule } from 'src/modules/role/role.module';

@Module({
  imports: [PermissionModule, RoleModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RolePresentationModule {}
