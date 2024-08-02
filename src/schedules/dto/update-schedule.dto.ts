import {
  CreateScheduleDto,
  baseCreateScheduleSchema,
} from './create-schedule.dto';

export const updateScheduleSchema = baseCreateScheduleSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Update object cannot be empty.',
  );

export type UpdateScheduleDto = Partial<CreateScheduleDto>;
