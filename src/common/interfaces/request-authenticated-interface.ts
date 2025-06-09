import { Request } from 'express';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface RequestAuthenticated extends Request {
  user?: UserEntity;
  // cache?: 'USE-CACHE' | 'NO-CACHE';
}
