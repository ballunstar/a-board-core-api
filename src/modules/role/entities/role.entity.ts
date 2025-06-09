import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
  Unique,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { APISortableFieldType } from 'src/common/types/api-sortable-field.type';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('roles')
@Unique('UQ_role_code', ['code']) // Define unique constraint
export class RoleEntity implements APIResponse {
  static sortableFields: APISortableFieldType = {
    id: 'roles.id',
    name: 'roles.name',
  };

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'json' })
  permissions: string[];

  @Column({ type: 'integer', default: 0 })
  priority: number;

  @Column({ type: 'boolean' })
  enabled: boolean;

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_has_role', // Join table name
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: Relation<UserEntity[]>;

  public addPermissions(permission: string[]) {
    this.permissions = permission;
  }

  toAPIResponse = () => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      code: this.code,
      enabled: this.enabled,
    };
  };
}
