import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  PrismaModule,
  loggingMiddleware,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { PrismaClientUnknownExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    SchedulesModule,
    TasksModule,
  ],
  providers: [
    providePrismaClientExceptionFilter(),
    {
      provide: APP_FILTER,
      useValue: new PrismaClientUnknownExceptionFilter(),
    },
  ],
})
export class AppModule {}
