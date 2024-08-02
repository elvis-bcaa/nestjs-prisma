import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';
import { PrismaClientUnknownExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
// import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
      P2003: HttpStatus.BAD_REQUEST,
    }),
  );
  app.useGlobalFilters(new PrismaClientUnknownExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
