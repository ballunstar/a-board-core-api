import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';
import config from 'src/config/config';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly redisService: RedisService) {}

  public async execute(userId: number): Promise<void> {
    const prefix = await this.keyPrefix();
    const section = `${prefix}:${userId}`;

    const isDeleted = await this.redisService.del(section);

    if (!isDeleted) {
      throw new Error('Logout failed: Token not found or already expired');
    }
  }

  private async keyPrefix(): Promise<string> {
    return config.get().credential.prefix;
  }
}
