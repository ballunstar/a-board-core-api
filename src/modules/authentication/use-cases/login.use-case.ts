import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { LoginTokenResponse } from 'src/common/interfaces/login-response.interface';
import config from 'src/config/config';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { LoginWithEmailDto } from 'src/presentation/auth/dtos/login-with-email.dto';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  public async execute(body: LoginWithEmailDto) {
    const userId = await this.validateOrCreateUser(body.email);
    const { accessToken } = await this.setAccessTokenToRedis(userId);
    return { accessToken };
  }

  private async validateOrCreateUser(email: string): Promise<number> {
    let user = await this.dataSource.manager.findOne(UserEntity, { where: { email } });

    if (!user) {
      const defaultRole = await this.getDefaultRole();
      user = this.dataSource.manager.create(UserEntity, { email, roles: [defaultRole] });

      user = await this.dataSource.manager.save(user);
    }

    return user.id;
  }

  private async setAccessTokenToRedis(userId: number) {
    const user = await this.dataSource.manager
      .createQueryBuilder(UserEntity, 'user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :userId', { userId })
      .getOne();

    const sessionId = uuidv4();

    const response: LoginTokenResponse = {
      userId: user.id,
      email: user.email,
      section: sessionId,
    };

    const secret = await this.secret();
    const expiresIn = await this.expiresIn(); // seconds
    const jwtExpiresIn: string | number = expiresIn >= 86400 ? Math.floor(expiresIn / 86400) + 'd' : expiresIn + 's';

    const accessToken = sign(response, secret, {
      expiresIn: jwtExpiresIn as any,
    });

    const prefix = await this.keyPrefix();
    const section = `${prefix}:${user.id}:${sessionId}`;

    await this.redisService.set(section, accessToken, expiresIn);

    return { accessToken, ...response };
  }

  private async getDefaultRole() {
    const defaultRole = await this.dataSource.manager.createQueryBuilder(RoleEntity, 'role').where('role.code = :code', { code: 'USER' }).getOne();

    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    return defaultRole;
  }

  private async secret() {
    return config.get().credential.secret;
  }

  private async expiresIn() {
    return config.get().credential.expiresIn;
  }

  private async keyPrefix() {
    return config.get().credential.prefix;
  }
}
