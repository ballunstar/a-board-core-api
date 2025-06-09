import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class SeederDefaultRoleUseCase {
  private readonly logger = new Logger(SeederDefaultRoleUseCase.name);
  constructor(
    private readonly dataSource: DataSource, // Assuming DataSource is imported from 'typeorm' or similar
  ) {}
  async execute(): Promise<void> {
    const existingRoles = await this.dataSource
      .createQueryBuilder(RoleEntity, 'role')
      .where('role.code IN (:...codes)', { codes: ['ADMIN', 'USER'] })
      .getMany();
    const existingRoleCodes = new Set(existingRoles.map((role) => role.code));
    const rolesToCreate = [
      { code: 'ADMIN', name: 'Administrator', permissions: ['*'] }, // Assuming permissions are set later or not needed for default roles
      { code: 'USER', name: 'User', permissions: ['*'] }, // Assuming permissions are set later or not needed for default roles
    ];
    const rolesToInsert = rolesToCreate.filter((role) => !existingRoleCodes.has(role.code));
    if (rolesToInsert.length > 0) {
      const roleEntities = rolesToInsert.map((role) => {
        const newRole = new RoleEntity();
        newRole.code = role.code;
        newRole.name = role.name;
        newRole.permissions = role.permissions || []; // Default to empty array if no permissions provided
        newRole.priority = 0; // Default priority
        newRole.enabled = true; // Default enabled state
        newRole.description = `Default role for ${role.name}`; // Optional description
        return newRole;
      });
      await this.dataSource.manager.save(roleEntities);
      this.logger.log(`Inserted default roles: ${rolesToInsert.map((role) => role.code).join(', ')}`);
    } else {
      this.logger.log('Default roles already exist, skipping insertion.');
    }
  }
}
