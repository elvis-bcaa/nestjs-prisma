import { z } from 'zod';

export const baseCreateScheduleSchema = z
  .object({
    accountId: z.number(),
    agentId: z.number(),
    startTime: z.coerce.date().refine((data) => data > new Date(), {
      message: 'must be in the future',
    }),
    endTime: z.coerce.date().refine((data) => data > new Date(), {
      message: 'must be in the future',
    }),
  })
  .required();

export const createScheduleSchema = baseCreateScheduleSchema.refine(
  (data) => data.endTime > data.startTime,
  {
    message: 'cannot be earlier than startTime.',
    path: ['endTime'],
  },
);

export type CreateScheduleDto = z.infer<typeof createScheduleSchema>;
