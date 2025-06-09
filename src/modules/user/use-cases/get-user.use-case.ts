import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(userId: number) {
    const user = await this.dataSource.manager.createQueryBuilder(UserEntity, 'user').andWhere('user.id = :userId', { userId }).getOne();
    return user;
  }
}
