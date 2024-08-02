import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { PrismaService } from 'nestjs-prisma';

describe('SchedulesController', () => {
  let schedulesController: SchedulesController;
  let schedulesService: SchedulesService;
  const schedule = {
    accountId: 1,
    agentId: 1,
    startTime: new Date('2023-10-01T00:00:00.000Z'),
    endTime: new Date('2023-10-01T01:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService, PrismaService],
    }).compile();

    schedulesService = module.get<SchedulesService>(SchedulesService);
    schedulesController = module.get<SchedulesController>(SchedulesController);
  });

  it('should create a schedule when valid data is provided', async () => {
    jest
      .spyOn(schedulesService, 'create')
      .mockResolvedValue({ id: '1', ...schedule });

    const result = await schedulesController.create(schedule);

    expect(result).toEqual({ id: '1', ...schedule });
    expect(schedulesService.create).toHaveBeenCalledWith(schedule);
  });

  it('should update a schedule when valid data is provided', async () => {
    jest
      .spyOn(schedulesService, 'update')
      .mockResolvedValue({ id: '1', ...schedule, tasks: [] });

    const result = await schedulesController.update('1', schedule);

    expect(result).toEqual({ id: '1', ...schedule, tasks: [] });
    expect(schedulesService.update).toHaveBeenCalledWith('1', schedule);
  });

  it('should retrieve all schedules when requested', async () => {
    jest.spyOn(schedulesService, 'findAll').mockResolvedValue([
      { id: '1', ...schedule, tasks: [] },
      { id: '2', ...schedule, tasks: [] },
    ]);

    const result = await schedulesController.findAll();

    expect(result).toEqual([
      { id: '1', ...schedule, tasks: [] },
      { id: '2', ...schedule, tasks: [] },
    ]);
    expect(schedulesService.findAll).toHaveBeenCalledWith();
  });

  it('should retrieve a schedule by valid UUID', async () => {
    jest
      .spyOn(schedulesService, 'findOne')
      .mockResolvedValue({ id: '1', ...schedule, tasks: [] });
    const id = 'valid-uuid';

    const result = await schedulesController.findOne(id);

    expect(result).toEqual({
      id: '1',
      ...schedule,
      tasks: [],
    });
    expect(schedulesService.findOne).toHaveBeenCalledWith(id);
  });

  // Deleting a schedule by valid UUID
  it('should delete a schedule when valid UUID is provided', async () => {
    jest
      .spyOn(schedulesService, 'remove')
      .mockResolvedValue({ id: '1', ...schedule });
    const id = 'valid-uuid';

    const result = await schedulesController.remove(id);

    expect(result).toEqual({
      id: '1',
      ...schedule,
    });
    expect(schedulesService.remove).toHaveBeenCalledWith(id);
  });
});
