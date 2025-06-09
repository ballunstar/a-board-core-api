import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { PresentationModule } from './presentation/presentation.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AccessMatrixMiddleware } from './infrastructure/middleware/access-matrix.middleware';
import { CredentialModule } from './modules/credential/credential.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RequestContextModule } from 'nestjs-request-context';
import { HTTPLoggerMiddleware } from './infrastructure/middleware/http-logger.middleware';
import { UserContextMiddleware } from './infrastructure/middleware/user-context.middleware';
import { AxiosModule } from './modules/axios/axios.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, CredentialModule, PermissionModule, PresentationModule, RequestContextModule, AxiosModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const PUBLIC_ROUTES = [
      { path: 'public/(.*)', method: RequestMethod.GET },
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'posts', method: RequestMethod.GET }, // matches /posts
      { path: 'posts/(.*)', method: RequestMethod.GET }, // matches /posts/:id, etc.
    ];

    /** Apply HTTP Logger for debugging purpose */
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
    consumer
      .apply(UserContextMiddleware)
      .exclude(...PUBLIC_ROUTES, { path: 'users/auth/login', method: RequestMethod.POST })
      .forRoutes('*');

    consumer
      .apply(AccessMatrixMiddleware)
      .exclude(...PUBLIC_ROUTES, { path: 'users/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
