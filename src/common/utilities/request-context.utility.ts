import { RequestContext } from 'nestjs-request-context';
import { UserProfileContextInterface } from '../constants/context.constants';

export const getUserContext = (): UserProfileContextInterface => {
  return RequestContext.currentContext.req['user_profile'];
};
