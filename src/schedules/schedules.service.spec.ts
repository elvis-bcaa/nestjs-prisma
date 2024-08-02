import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

// Makes sure the schedule service calls the correct underlying prisma methods with the correct values
describe('SchedulesService', () => {
  const schedule: CreateScheduleDto = {
    accountId: 1,
    agentId: 1,
    startTime: new Date(),
    endTime: new Date(),
  };
  it('should create a new schedule when valid data is provided', async () => {
    const prismaService = {
      schedule: {
        create: jest.fn().mockResolvedValue({ id: '1', ...schedule }),
      },
    };
    const schedulesService = new SchedulesService(prismaService as any);
    const result = await schedulesService.create(schedule);

    expect(prismaService.schedule.create).toHaveBeenCalledWith({
      data: schedule,
    });
    expect(result).toEqual({ id: '1', ...schedule });
  });

  it('should update a schedule when valid data is provided', async () => {
    const mockResolvedValue = {
      id: '1',
      ...schedule,
    };
    const prismaService = {
      schedule: {
        update: jest.fn().mockResolvedValue(mockResolvedValue),
      },
    };
    const schedulesService = new SchedulesService(prismaService as any);
    const updateScheduleDto = { agentId: 2 };
    const id = '1';

    const result = await schedulesService.update(id, updateScheduleDto);

    expect(prismaService.schedule.update).toHaveBeenCalledWith({
      where: { id },
      data: updateScheduleDto,
      include: {
        tasks: true,
      },
    });
    expect(result).toEqual(mockResolvedValue);
  });

  // Retrieving all schedules
  it('should retrieve all schedules', async () => {
    const prismaService = {
      schedule: {
        findMany: jest.fn().mockResolvedValue([
          { id: '1', ...schedule },
          { id: '2', ...schedule },
        ]),
      },
    };
    const schedulesService = new SchedulesService(prismaService as any);

    const result = await schedulesService.findAll();

    expect(prismaService.schedule.findMany).toHaveBeenCalledWith({
      include: {
        tasks: true,
      },
    });
    expect(result).toEqual([
      { id: '1', ...schedule },
      { id: '2', ...schedule },
    ]);
  });

  // Retrieving a schedule by a valid ID
  it('should retrieve a schedule by a valid ID', async () => {
    const prismaService = {
      schedule: {
        findUnique: jest.fn().mockResolvedValue({ id: '1', ...schedule }),
      },
    };
    const schedulesService = new SchedulesService(prismaService as any);
    const id = '1';

    const result = await schedulesService.findOne(id);

    expect(prismaService.schedule.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        tasks: true,
      },
    });
    expect(result).toEqual({ id: '1', ...schedule });
  });

  // Deleting a schedule by a valid ID
  it('should delete a schedule when a valid ID is provided', async () => {
    const prismaService = {
      schedule: {
        delete: jest.fn().mockResolvedValue({ id: '1', ...schedule }),
      },
    };
    const schedulesService = new SchedulesService(prismaService as any);
    const id = '1';

    const result = await schedulesService.remove(id);

    expect(prismaService.schedule.delete).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual({ id: '1', ...schedule });
  });
});
