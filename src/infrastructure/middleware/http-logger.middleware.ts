import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { first, trim } from 'lodash';

@Injectable()
export class HTTPLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(HTTPLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, headers } = request;

    const IP = trim(first(((headers['x-forwarded-for'] as string) || request.connection?.remoteAddress || '').split(',')));
    const userAgent = request.get('user-agent') || '';

    /** TODO: Logging Request Body (enable from server_configuration) */
    const shouldLogRequestBody = false; // This should be replaced with a configuration check
    if (shouldLogRequestBody) {
      this.logger.log(body);
    }

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${IP}`);
    });

    next();
  }
}
