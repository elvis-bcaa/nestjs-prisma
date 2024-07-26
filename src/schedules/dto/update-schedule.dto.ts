import { CreateScheduleDto, createScheduleSchema } from './create-schedule.dto';

export const updateScheduleSchema = createScheduleSchema.partial();

export type UpdateScheduleDto = Partial<CreateScheduleDto>;
