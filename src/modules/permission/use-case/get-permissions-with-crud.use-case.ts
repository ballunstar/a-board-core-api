import { Injectable } from '@nestjs/common';
import { HttpMethod } from 'src/common/interfaces/shared.interface';
import { PermissionRepository } from '../repositories/permission.repository';
import { Brackets } from 'typeorm';

@Injectable()
export class GetPermissionsWithCrudUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  public async execute() {
    return this.getAllPermissions();
  }

  private async getAllPermissions() {
    const allHttpMethods = [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH];

    const methodToAction = {
      GET: 'READ',
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };

    const expandedEndpoints = [];

    for (const [moduleName, endpoints] of Object.entries(listModules)) {
      for (const endpoint of endpoints) {
        if (endpoint.method === 'ALL') {
          for (const method of allHttpMethods) {
            expandedEndpoints.push({
              ...endpoint,
              method: method,
              action: endpoint.action || methodToAction[method],
            });
          }
        } else {
          expandedEndpoints.push({
            ...endpoint,
            action: endpoint.action || methodToAction[endpoint.method],
          });
        }
      }
    }
    // Extract all unique paths from the expanded endpoints
    const uniquePaths = Array.from(new Set(expandedEndpoints.map((endpoint) => endpoint.path)));

    const permissions = await this.permissionRepository
      .createQueryBuilder('permission')
      .where('permission.enabled = :enabled', { enabled: true })
      .andWhere(
        new Brackets((qb) => {
          uniquePaths.forEach((path, index) => {
            if (index === 0) {
              qb.where('permission.path LIKE :path' + index, {
                ['path' + index]: `${path}%`,
              });
            } else {
              qb.orWhere('permission.path LIKE :path' + index, {
                ['path' + index]: `${path}%`,
              });
            }
          });
        }),
      )
      .getMany();

    const groupedPermissions = {};

    for (const [moduleName, endpoints] of Object.entries(listModules)) {
      if (!groupedPermissions[moduleName]) {
        groupedPermissions[moduleName] = {};
      }
      for (const endpoint of endpoints) {
        const matchedPermissions = permissions.filter(
          (permission) => permission.path.startsWith(endpoint.path) && (endpoint.method === 'ALL' || permission.method === endpoint.method),
        );

        matchedPermissions.forEach((permission) => {
          const action = endpoint.action || methodToAction[permission.method];
          if (!groupedPermissions[moduleName][action]) {
            groupedPermissions[moduleName][action] = [];
          }
          groupedPermissions[moduleName][action].push(permission);
        });
      }
    }

    return groupedPermissions;
  }
}

export const listModules = {
  project: [
    {
      path: '/organization/projects',
      method: 'ALL',
      description: 'Project',
      action: '',
    },
  ],
};
