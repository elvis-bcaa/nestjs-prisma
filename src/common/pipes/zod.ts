import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const errorObject = error.issues[0];
      throw new BadRequestException(
        errorObject.path[0] + ' ' + errorObject.message,
      );
    }
  }
}
