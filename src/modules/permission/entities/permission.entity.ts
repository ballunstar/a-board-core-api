import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';

import { HttpMethod, HttpMethodValue } from 'src/common/interfaces/shared.interface';
import { PermissionGroupEntity } from './permission-group.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'mediumtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: HttpMethod,
  })
  method: HttpMethodValue;

  @Column({
    type: 'varchar',
  })
  path: string;

  @ManyToOne(() => PermissionGroupEntity, { nullable: true })
  @JoinTable()
  permissionGroup: PermissionGroupEntity;

  @Column({
    type: 'boolean',
    default: true,
  })
  accessible: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
