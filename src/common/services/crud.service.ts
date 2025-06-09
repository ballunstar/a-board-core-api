import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CrudService<Entity> {
  constructor(protected readonly repo: Repository<Entity>) {}

  async create(data: Partial<Entity>): Promise<Entity> {
    const entity = this.repo.create(data as Entity);
    return this.repo.save(entity);
  }

  async findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repo.find({ where: { ...options?.where } as any, ...options });
  }

  async findOne(id: number, options?: FindOneOptions<Entity>): Promise<Entity> {
    const entity = await this.repo.findOne({ where: { id } as any, ...options });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, data: Partial<Entity>): Promise<Entity> {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
