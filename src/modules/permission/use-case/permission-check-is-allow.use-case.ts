import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PermissionRepository } from '../repositories/permission.repository';
import { In } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class PermissionCheckIsAllowUseCase {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(req: Request, user: UserEntity) {
    const spitedPath = req.originalUrl.split('?')[0].split('/');
    const method = req.method.toUpperCase();

    const roles = user.roles.map((role) => role.code);
    const uniquePermissions = [
      ...new Map(
        user.roles.flatMap((role) => role.permissions.map((item) => item)).map((permission) => [permission, permission]), // Map by code
      ).values(), // Retrieve unique values
    ];
    if (roles.includes('ORG_SUPER_ADMIN') || uniquePermissions.includes('*')) {
      return true;
    }

    if (['/auth/change/password', '/auth/logout'].includes(req.originalUrl)) {
      return true;
    }

    const permissions = await this.permissionRepository.find({
      where: [
        {
          code: In(uniquePermissions),
          enabled: true,
        },
        {
          permissionGroup: {
            name: In(uniquePermissions),
          },
        },
      ],
      order: {
        updatedAt: 'DESC',
      },
      relations: {
        permissionGroup: true,
      },
    });

    let filterPermission: PermissionEntity;
    for (const permission of permissions) {
      let isPass = false;

      const accessSpitedPath = permission.path.split('/');
      if (permission.method === method) {
        isPass = true;
      } else if (permission.path && permission.method === method && spitedPath.length === accessSpitedPath.length) {
        isPass = true;
        for (let i = 0; i < accessSpitedPath.length; i++) {
          const isCanAccess = await this.checkEachSpitedPath(accessSpitedPath[i], spitedPath[i], user, method);

          if (!isCanAccess) {
            isPass = false;
            break;
          }
        }
      }
      if (isPass) {
        filterPermission = permission;
        break;
      }
    }
    return filterPermission && filterPermission.accessible === true;
  }

  private async checkEachSpitedPath(basePath: string, comparePath: string, user: UserEntity, method: string) {
    if (basePath.startsWith(':')) {
      // TODO : Re Check super admin permission
      const roles = user.roles.map((role) => role.code);
      if (roles.includes('ORG_SUPER_ADMIN')) {
        return true;
      }
      if (basePath === ':userId') {
        // Case user id in path
        const userId = Number(comparePath);
        const userTarget = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.roles', 'roles')
          .where('user.id = :userId', { userId })
          .getOne();
        // if (
        //   ['PUT', 'PATCH', 'DELETE'].includes(method) &&
        //   userTarget.roles[0].priority < user.roles[0].priority
        // ) {
        //   return false;
        // }
      }
    } else if (basePath !== comparePath) {
      return false;
    }
    return true;
  }
}
