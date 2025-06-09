import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserProfileContextInterface } from 'src/common/constants/context.constants';
import { VerifyCredentialUseCase } from 'src/modules/authentication/use-cases/verify-credential.use-case';
import { VerifyUserCredentialUseCase } from 'src/modules/authentication/use-cases/verify-user-credential.use-case';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(
    private readonly verifyCredentialUseCase: VerifyCredentialUseCase,
    private readonly verifyUserCredentialUseCase: VerifyUserCredentialUseCase,
  ) {}
  public async use(req: Request, res: Response, next: NextFunction) {
    // Check if the request is for the public folder
    req['middlewareStartTime'] = Date.now();
    if (req.originalUrl.includes('/public')) {
      return next();
    }
    // if have x-credential-token, verify the token
    if (req.originalUrl.startsWith('/internal')) {
      if (req.originalUrl.startsWith('/internal/credential') && process.env.NODE_ENV === 'jest') {
        return next();
      }

      const token = req.headers['x-credential-token'] as string;
      const isValid = await this.verifyCredentialUseCase.execute(token);
      if (isValid) {
        return next();
      }
      throw new ForbiddenException(`Permission Denied You can't access this.`);
    } else {
      const { payload: tokenPayload } = await this.verifyUserCredentialUseCase.execute(req.headers.authorization);
      if (tokenPayload.user) {
        req['user'] = tokenPayload.user;
        req['user_profile'] = {
          user: tokenPayload.user,
        } as UserProfileContextInterface;
        return next();
      }
    }
    throw new ForbiddenException(`Permission Denied You can't access this.`);
  }
}
