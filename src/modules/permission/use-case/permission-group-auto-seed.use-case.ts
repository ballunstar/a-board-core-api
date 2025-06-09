import { Injectable, Logger } from '@nestjs/common';
import { PermissionGroupRepository } from '../repositories/permission-group.repository';
import { PermissionGroupActionEnum, PermissionGroupEntity } from '../entities/permission-group.entity';
@Injectable()
export class PermissionGroupAutoSeedUseCase {
  private readonly logger = new Logger(PermissionGroupAutoSeedUseCase.name);
  constructor(private readonly permissionGroupRepository: PermissionGroupRepository) {}

  public async execute(permissionGroupNames: string[]) {
    const [existingPermissionGroups, total] = await this.permissionGroupRepository.findAndCount();
    // if (permissionGroupNames.length <= total) return;
    const codesSet = new Set(existingPermissionGroups.map((permissionGroup) => permissionGroup.name));

    const permissionGroupName = permissionGroupNames.filter((x) => !!x);

    for (const item of permissionGroupName) {
      if (!item) return;
      const groupName = item.toUpperCase();
      const [scope, featureName, action] = groupName.split('-');

      if (!codesSet.has(groupName)) {
        const newPermissionGroup = new PermissionGroupEntity();
        newPermissionGroup.name = groupName;
        newPermissionGroup.action = action as PermissionGroupActionEnum;
        newPermissionGroup.featureName = featureName;
        await this.permissionGroupRepository.save(newPermissionGroup); //
        this.logger.log(`Saved Permission Group with code: ${groupName}`);
      } else {
        this.logger.log(`Permission Group with code ${groupName} already exists, skipping...`);
      }
    }
  }
}

export interface RouterPath {
  path: string;
  method: string;
}
