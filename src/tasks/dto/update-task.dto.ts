import { CreateTaskDto, createTaskSchema } from './create-Task.dto';

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Update object cannot be empty.',
  );

export type UpdateTaskDto = Partial<CreateTaskDto>;
