import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaClientUnknownExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientUnknownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    if (message.includes('endTime_greater_than_startTime')) {
      const status = HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        error: 'Bad Request',
        message: 'endTime must be greater than startTime',
      });
    }

    if (
      message.includes(
        'Task startTime must be within the startTime and endTime of the associated Schedule',
      )
    ) {
      const status = HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        error: 'Bad Request',
        message:
          'Task startTime must be within the startTime and endTime of the associated Schedule',
      });
    }

    // default 500 error code
    super.catch(exception, host);
  }
}
