import { Prisma } from '@prisma/client';
import { PrismaClientUnknownExceptionFilter } from './prisma-client-exception.filter';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

describe('PrismaClientUnknownExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaClientUnknownExceptionFilter()).toBeDefined();
  });

  // Handles PrismaClientUnknownRequestError exceptions
  it('should return 400 Bad Request when endTime is not greater than startTime', () => {
    const exception = new Prisma.PrismaClientUnknownRequestError(
      'endTime_greater_than_startTime',
      { clientVersion: '4.0.0' },
    );
    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
    };
    const filter = new PrismaClientUnknownExceptionFilter();
    filter.catch(exception, host as unknown as ArgumentsHost);
    expect(host.getResponse().status).toHaveBeenCalledWith(
      HttpStatus.BAD_REQUEST,
    );
    expect(host.getResponse().json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: 'endTime must be greater than startTime',
    });
  });

  // Handles PrismaClientUnknownRequestError exceptions
  it('should return 400 Bad Request when Task startTime is not within the startTime and endTime of the associated Schedule', () => {
    const exception = new Prisma.PrismaClientUnknownRequestError(
      'Task startTime must be within the startTime and endTime of the associated Schedule',
      { clientVersion: '4.0.0' },
    );
    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
    };
    const filter = new PrismaClientUnknownExceptionFilter();
    filter.catch(exception, host as unknown as ArgumentsHost);
    expect(host.getResponse().status).toHaveBeenCalledWith(
      HttpStatus.BAD_REQUEST,
    );
    expect(host.getResponse().json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message:
        'Task startTime must be within the startTime and endTime of the associated Schedule',
    });
  });

  // Exception message does not match any known patterns
  it('should call super.catch when exception message does not match known patterns', () => {
    const exception = new Prisma.PrismaClientUnknownRequestError(
      'unknown error',
      { clientVersion: '4.0.0' },
    );
    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
      getArgByIndex: jest.fn().mockReturnValue({ isHeadersSent: false }),
    };
    const filter = new PrismaClientUnknownExceptionFilter();
    const superCatchSpy = jest
      .spyOn(BaseExceptionFilter.prototype, 'catch')
      .mockReturnThis();
    filter.catch(exception, host as unknown as ArgumentsHost);
    expect(superCatchSpy).toHaveBeenCalledWith(exception, host);
  });
});
