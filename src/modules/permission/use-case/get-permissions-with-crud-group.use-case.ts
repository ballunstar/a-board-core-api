import { PermissionGroupRepository } from './../repositories/permission-group.repository';
import { Injectable } from '@nestjs/common';
import { set } from 'lodash';

@Injectable()
export class GetPermissionsWithCRUDGroupUseCase {
  constructor(private readonly PermissionGroupRepository: PermissionGroupRepository) {}

  public async execute() {
    return this.getAllPermissions();
  }

  private async getAllPermissions() {
    const permissionGroups = await this.PermissionGroupRepository.find({});
    const response = {};
    permissionGroups.forEach((permissionGroup) => {
      set(response, [permissionGroup.featureName, permissionGroup.action].join('.'), [permissionGroup.name]);
    });
    return response;
  }
}
