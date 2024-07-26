import { z } from 'zod';

export const createScheduleSchema = z
  .object({
    accountId: z.number(),
    agentId: z.number(),
    startTime: z.string().pipe(z.coerce.date()),
    endTime: z.string().pipe(z.coerce.date()),
  })
  .required();

export type CreateScheduleDto = z.infer<typeof createScheduleSchema>;
