import { z } from 'zod';

export enum TaskType {
  break = 'break',
  work = 'work',
}

export const createTaskSchema = z
  .object({
    accountId: z.number(),
    startTime: z.coerce.date().refine((data) => data > new Date(), {
      message: 'must be in the future',
    }),
    duration: z.number(),
    type: z.nativeEnum(TaskType),
    scheduleId: z.string().uuid(),
  })
  .required();

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
