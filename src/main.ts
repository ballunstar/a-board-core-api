import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { PermissionAutoSeedUseCase } from './modules/permission/use-case/permission-auto-seed.use-case';
import { compact } from 'lodash';
import moment from 'moment-timezone';

import { PermissionGroupAutoSeedUseCase } from './modules/permission/use-case/permission-group-auto-seed.use-case';
import * as bodyParser from 'body-parser';
import { getPermissionGroupNameFromArrayString } from './common/utilities/generate-permission-group';
import { SeederDefaultRoleUseCase } from './modules/role/use-cases/seeder-default-role.use-case';

// set moment time zone to bangkok
moment.tz.setDefault('Asia/Bangkok');

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'],
  });

  // ✅ Increase body size limits
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // app.useGlobalInterceptors(new CamelCaseInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PRE BUILT INSPECTION CORE API')
    .addBearerAuth(
      {
        description: `Enter token from login api (without Bearer prefix only swagger) but postman should be start with Bearer (space) (token)`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Retrieve routes and tags from Swagger
  const paths = document.paths;
  const routesWithTags = Object.entries(paths).flatMap(([path, methods]) => {
    return Object.entries(methods as any).map(([method, details]: any) => ({
      path,
      method: method.toUpperCase(),
      tags: details.tags || [], // Extract Swagger tags
    }));
  });

  const routesWithTagsFormatted = routesWithTags.map((route) => {
    // change {path} to :path
    const path = route.path.replace(/{/g, ':').replace(/}/g, '');
    return {
      ...route,
      oldPath: route.path,
      path,
      permissionGroup: getPermissionGroupNameFromArrayString(route.tags),
    };
  });

  try {
    await app.listen(process.env.PORT || 7999, () => {
      logger.log(`Server is running on PORT ${process.env.PORT || 7999}`);
    });

    const server = app.getHttpServer();

    const permissionGroupUseCase = app.get(PermissionGroupAutoSeedUseCase);
    await permissionGroupUseCase.execute(compact(routesWithTagsFormatted.map((x) => x.permissionGroup)));

    const permissionUseCase = app.get(PermissionAutoSeedUseCase);
    await permissionUseCase.execute(routesWithTagsFormatted);

    const defaultRoleUseCase = app.get(SeederDefaultRoleUseCase);
    await defaultRoleUseCase.execute();
  } catch (error) {
    logger.error('Error during bootstrap initialization', error);
    process.exit(1); // Exit process on error
  }
}
bootstrap();
