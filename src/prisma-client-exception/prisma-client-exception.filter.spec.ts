import { PrismaClientUnknownExceptionFilter } from './prisma-client-exception.filter';

describe('PrismaClientUnknownExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaClientUnknownExceptionFilter()).toBeDefined();
  });
});
