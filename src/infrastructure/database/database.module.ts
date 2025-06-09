// database.module.ts
import { Global, Module } from '@nestjs/common';
import { MysqlModule } from './mysql.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    MysqlModule,
    RedisModule.register(), // Register RedisModule here
  ],
  exports: [MysqlModule, RedisModule], // Export RedisModule to make it available to other modules
})
export class DatabaseModule {}
