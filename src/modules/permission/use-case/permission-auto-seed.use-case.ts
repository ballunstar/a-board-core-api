import { Injectable, Logger } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { compact } from 'lodash';
import { PermissionGroupRepository } from '../repositories/permission-group.repository';
import { PermissionGroupEntity } from '../entities/permission-group.entity';

@Injectable()
export class PermissionAutoSeedUseCase {
  private readonly logger = new Logger(PermissionAutoSeedUseCase.name);
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly permissionGroupRepository: PermissionGroupRepository,
  ) {}

  public async execute(paths: RouterPath[]) {
    const [existingPermissions, total] = await this.permissionRepository.findAndCount({
      relations: {
        permissionGroup: true,
      },
    });

    const [existingPermissionGroups, totalPermissionGroup] = await this.permissionGroupRepository.findAndCount();
    if (paths.length === total) return;
    const existingPermissionMap: { [code: string]: PermissionEntity } = {};
    existingPermissions.forEach((x) => {
      existingPermissionMap[x.code] = x;
    });

    const existingPermissionGroupMap: { [name: string]: PermissionGroupEntity } = {};
    existingPermissionGroups.forEach((x) => {
      existingPermissionGroupMap[x.name] = x;
    });

    const codesSet = new Set(existingPermissions.map((permission) => permission.code));

    for (const item of paths) {
      const code = this.generateUppercaseCode(item.path, item.method);

      if (!codesSet.has(code)) {
        const newPermission = new PermissionEntity();
        newPermission.code = code;
        newPermission.name = '';
        newPermission.description = '';
        newPermission.method = item.method.toUpperCase() as any;
        newPermission.path = item.path;
        newPermission.accessible = true;
        newPermission.enabled = true;
        newPermission.permissionGroup = existingPermissionGroupMap[item.permissionGroup];
        await this.permissionRepository.save(newPermission); //
        this.logger.log(`Saved Permission with code: ${code}`);
      } else if (existingPermissionMap[code] && (existingPermissionMap[code]?.permissionGroup?.name || '') !== item.permissionGroup) {
        const existing = existingPermissionMap[code];
        existing.permissionGroup = existingPermissionGroupMap[item.permissionGroup];
        await this.permissionRepository.save(existing);
        this.logger.log(`Saved Existing Permission with code: ${code}`);
      } else {
        this.logger.log(`Permission with code ${code} already exists, skipping...`);
      }
    }
  }

  private generateUppercaseCode(path: string, method: string): string {
    const methodPrefixes = {
      GET: 'G',
      POST: 'P',
      PUT: 'PU',
      PATCH: 'PT',
      DELETE: 'D',
      OPTIONS: 'O',
    };

    const methodCode = methodPrefixes[method.toUpperCase()] || '';

    const pathSegments = path.split('/').filter((segment) => segment !== '');
    const pathCode = pathSegments.map((segment) => segment.toUpperCase()).join('_');

    const code = `${methodCode}_${pathCode}`;
    return code;
  }
}

export interface RouterPath {
  path: string;
  method: string;
  permissionGroup: string;
}
