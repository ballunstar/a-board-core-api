import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { VerifyCredentialUseCase } from 'src/modules/authentication/use-cases/verify-credential.use-case';
import { VerifyUserCredentialUseCase } from 'src/modules/authentication/use-cases/verify-user-credential.use-case';
import { PermissionCheckIsAllowUseCase } from 'src/modules/permission/use-case/permission-check-is-allow.use-case';

@Injectable()
export class AccessMatrixMiddleware implements NestMiddleware {
  constructor(
    private readonly verifyCredentialUseCase: VerifyCredentialUseCase,
    private readonly verifyUserCredentialUseCase: VerifyUserCredentialUseCase,
    private readonly permissionCheckIsAllowUseCase: PermissionCheckIsAllowUseCase,
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
      // const { payload: tokenPayload } = await this.verifyUserCredentialUseCase.execute(req.headers.authorization);
      const user = req['user'];
      if (user) {
        const isAllow = await this.permissionCheckIsAllowUseCase.execute(req, user);
        if (!isAllow) {
          throw new ForbiddenException(`Permission Denied You can't access this. ${req.originalUrl}`);
        }
        return next();
      }
    }
    throw new ForbiddenException(`Permission Denied You can't access this.`);
  }
}
