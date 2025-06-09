import { PermissionGroupActionEnum } from './../../modules/permission/entities/permission-group.entity';
import { compact, last } from 'lodash';

export const PERMISSION_GROUP_NAME_ANNOTATION = '@PERMISSION_GROUP_NAME@';
export const PERMISSION_GROUP_SCOPE_ANNOTATION = '@PERMISSION_GROUP_SCOPE@';

export const generatePermissionGroupName = (name: string, action: PermissionGroupActionEnum) => {
  return compact([PERMISSION_GROUP_NAME_ANNOTATION, name.toUpperCase(), action]).join('-');
};

export const getPermissionGroupNameFromArrayString = (items: string[]) => {
  const scope = last(items.find((x) => x.startsWith(PERMISSION_GROUP_SCOPE_ANNOTATION))?.split('-'));
  const name = last(items.find((x) => x.startsWith(PERMISSION_GROUP_NAME_ANNOTATION))?.split(`${PERMISSION_GROUP_NAME_ANNOTATION}-`));
  if (!name) return '';
  return compact([scope, name]).join('-');
};
