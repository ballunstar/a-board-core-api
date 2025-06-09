import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { LoginTokenResponse } from 'src/common/interfaces/login-response.interface';
import config from 'src/config/config';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class VerifyUserCredentialUseCase {
  private logger = new Logger(VerifyUserCredentialUseCase.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  public async execute(credential: string): Promise<VerifyUserCredentialUseCaseResponse> {
    if (!credential) {
      throw new UnauthorizedException('Missing token on the request');
    }

    const [tokenType, token] = credential.split(' ');

    if (!(tokenType === 'Bearer' && token)) {
      throw new UnauthorizedException('Token was incorrect or it has been expired');
    }

    const payload = await this.checkToken(token);

    const prefix = await this.keyPrefix();
    const section = await this.redisService.get(prefix + ':' + payload.userId + ':' + payload.section);
    if (!section) {
      throw new UnauthorizedException('Token was incorrect or it has been expired 3');
    }

    const user = await this.getUser(payload.userId);

    const uniquePermissions = [
      ...new Map().values(), // Retrieve unique values
    ];

    const response: VerifyUserCredentialUseCaseResponsePayload = {
      ...payload,
      accessToken: token,
      login: true,
      user: user,
      permissions: uniquePermissions,
      failureMessages: [],
      successMessage: '',
      role: [],
    };
    return { payload: response };
  }

  private async checkToken(token: string) {
    try {
      const secret = await this.secret();
      jwt.verify(token, secret);
      return jwt.decode(token) as LoginTokenResponse;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Token was incorrect or it has been expired');
    }
  }

  private async secret() {
    return config.get().credential.secret;
  }

  private async keyPrefix() {
    return config.get().credential.prefix;
  }

  private async getUser(userId: number) {
    const user = await this.dataSource.manager
      .createQueryBuilder(UserEntity, 'user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}

export interface VerifyUserCredentialUseCaseResponse {
  payload: VerifyUserCredentialUseCaseResponsePayload;
}

export interface VerifyUserCredentialUseCaseResponsePayload extends Omit<LoginTokenResponse, 'role'> {
  login: boolean;
  user: UserEntity;
  permissions: { code: string }[];
  failureMessages: string[];
  successMessage: string;
  role: { code: string; name: string }[];
}
