import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CommentEntity } from './comment.entity';
import { APISortableFieldType } from 'src/common/types/api-sortable-field.type';

export enum PostCategory {
  HISTORY = 'History',
  FOOD = 'Food',
  PETS = 'Pets',
  HEALTH = 'Health',
  FASHION = 'Fashion',
  EXERCISE = 'Exercise',
  OTHERS = 'Others',
}

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PostCategory })
  category: PostCategory;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true, onDelete: 'CASCADE' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post, { cascade: true, onDelete: 'CASCADE' })
  comments: CommentEntity[];

  @Column({ type: 'int', default: 0 })
  commentCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toAPIResponse() {
    return {
      id: this.id,
      category: this.category,
      title: this.title,
      content: this.content,
      commentCount: this.commentCount,
      author: this.author ? this.author.toAPIResponse() : null,
      comments: this.comments ? this.comments.map((comment) => comment.toAPIResponse()) : [],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  static sortableFields: APISortableFieldType = {
    id: 'posts.id',
    category: 'posts.category',
    title: 'posts.title',
    content: 'posts.content',
    commentCount: 'posts.commentCount',
  };

  static filterableFields: APISortableFieldType = {
    category: 'posts.category',
    authorId: 'posts.author.id',
  };
}
