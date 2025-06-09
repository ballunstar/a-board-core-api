import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { eager: true, onDelete: 'CASCADE' })
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  toAPIResponse() {
    return {
      id: this.id,
      content: this.content,
      post: this.post ? { id: this.post.id, title: this.post.title } : null,
      author: this.author ? this.author.toAPIResponse() : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
