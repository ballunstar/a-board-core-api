import { RoleEntity } from 'src/modules/role/entities/role.entity';

export type TransformedApprovalStep = {
  role: RoleEntity;
  sequence: number;
  isInspector: boolean;
};
