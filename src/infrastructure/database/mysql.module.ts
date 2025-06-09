import { cloneDeep } from 'lodash';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';
import { CredentialEntity } from 'src/modules/credential/entities/credential.entity';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PermissionGroupEntity } from 'src/modules/permission/entities/permission-group.entity';
import { UserDeviceEntity } from 'src/modules/user/entities/user-device.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { CommentEntity } from 'src/modules/post/entities/comment.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbConfig = cloneDeep(config.get().database); // Clone the config to make it mutable

        return {
          ...dbConfig,
          entities: [RoleEntity, UserEntity, UserDeviceEntity, CredentialEntity, PermissionEntity, PermissionGroupEntity, PostEntity, CommentEntity],
          subscribers: [],
        };
      },
    }),
  ],
})
export class MysqlModule implements OnModuleInit {
  private logger = new Logger(MysqlModule.name);

  async onModuleInit() {
    this.logger.log('MySQL Database Initialized Successfully');
  }
}
