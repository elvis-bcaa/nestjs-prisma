import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './common/interceptors/errors';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

@Module({
  imports: [PrismaModule, SchedulesModule, TasksModule],

  controllers: [AppController],
  providers: [
    AppService,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
