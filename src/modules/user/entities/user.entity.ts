import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';

import { CredentialEntity } from 'src/modules/credential/entities/credential.entity';
import { APISortableFieldType } from 'src/common/types/api-sortable-field.type';
import { Exclude, Expose } from 'class-transformer';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import _ from 'lodash';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { CommentEntity } from 'src/modules/post/entities/comment.entity';

@Entity('users')
export class UserEntity implements APIResponse {
  static sortableFields: APISortableFieldType = {
    id: 'users.id',
    email: 'users.email',
    verify: 'users.verify',
    createdAt: 'users.createdAt',
    updatedAt: 'users.updatedAt',
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
  })
  @Expose()
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Expose()
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Expose()
  lastName: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CredentialEntity, (credential) => credential.user)
  credential: Relation<CredentialEntity>;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    nullable: true,
    eager: true,
  })
  roles: Relation<RoleEntity[]>;

  @Column({ type: 'boolean', default: true })
  @Expose()
  enabled: boolean;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  getFullName = () => {
    return _.compact([this.firstName, this.lastName]).join(' ');
  };

  toAPIResponse = () => {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  };
}
