import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

export enum PermissionGroupActionEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity('permission_groups')
export class PermissionGroupEntity {
  @Generated('increment')
  id: number;

  @PrimaryColumn('varchar')
  name: string;

  @Column({
    type: 'varchar',
  })
  featureName: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: PermissionGroupActionEnum,
  })
  action: PermissionGroupActionEnum;
}
