import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.use(
    session({
      secret: '!SU4^&8&&nt6$13Fu5fQ$u46&Y\n',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Git Branch App API')
    .setDescription('API documentation for the Git Branch App')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('projects')
    .addTag('repositories')
    .addTag('git')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
