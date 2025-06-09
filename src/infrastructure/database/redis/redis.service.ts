import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import RedisMock from 'ioredis-mock'; // Import the mock
import config from 'src/config/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  async onModuleInit() {
    const redisConfig = config.get().redis;
    const isTestEnv = process.env.NODE_ENV === 'jest'; // Detect the environment
    if (!redisConfig.disable) {
      if (!isTestEnv) {
        this.client = new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
          retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        });
      } else {
        // Use mock client in test environment
        this.client = new RedisMock();
      }

      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });

      this.client.on('error', (err) => {
        this.logger.error('Redis connection error: ' + err);
      });

      this.client.on('close', () => {
        this.logger.warn('Redis connection closed');
      });

      this.client.on('reconnecting', (delay) => {
        this.logger.warn(`Redis reconnecting... Next attempt in ${delay}ms`);
      });
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.quit();
        this.logger.log('Redis connection closed');
      } catch (err) {
        this.logger.error('Error closing Redis connection: ' + err);
      }
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return this.client ? await this.client.get(key) : null;
    } catch (err) {
      this.logger.error(`Error getting key ${key}: ${err}`);
      return null;
    }
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      return this.client ? await this.client.keys(pattern) : [];
    } catch (err) {
      this.logger.error(`Error getting keys with pattern ${pattern}: ${err}`);
      return [];
    }
  }

  async hset(hash: string, key: string, value: string): Promise<void> {
    try {
      await this.client.hset(hash, key, value);
    } catch (err) {
      this.logger.error(`Error setting hash ${hash} key ${key}: ${err}`);
    }
  }

  async hgetall(hash: string): Promise<{ [key: string]: string }> {
    try {
      return await this.client.hgetall(hash);
    } catch (err) {
      this.logger.error(`Error getting hash ${hash}: ${err}`);
      return {};
    }
  }

  async scan(cursor: string = '0', pattern: string = '*'): Promise<string[]> {
    const keys: string[] = [];
    try {
      let nextCursor = cursor;

      do {
        const result = await this.client.scan(nextCursor, 'MATCH', pattern);
        nextCursor = result[0];
        keys.push(...result[1]);
      } while (nextCursor !== '0'); // Keep scanning until the cursor returns to 0

      return keys;
    } catch (err) {
      this.logger.error(`Error scanning with pattern ${pattern}: ${err}`);
      return [];
    }
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    try {
      if (this.client) {
        await this.client.set(key, value, 'EX', expire);
      }
    } catch (err) {
      this.logger.error(`Error setting key ${key}: ${err}`);
    }
  }

  async del(key: string): Promise<number> {
    try {
      if (this.client) {
        return await this.client.del(key);
      }
      return 0;
    } catch (err) {
      this.logger.error(`Error deleting key ${key}: ${err}`);
      return 0;
    }
  }

  async removeByPrefix(prefix: string): Promise<void> {
    try {
      if (this.client) {
        const keys = await this.client.keys(prefix + '*');
        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      }
    } catch (err) {
      this.logger.error(`Error deleting keys with prefix ${prefix}: ${err}`);
    }
  }

  async ping(): Promise<string> {
    try {
      return this.client ? await this.client.ping() : 'Redis client not initialized';
    } catch (err) {
      this.logger.error(`Error pinging Redis: ${err}`);
      return 'Error';
    }
  }
}
