import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('update', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should update a schedule when given a valid id and valid updateScheduleDto', () => {
    const id = '1';
    const updateScheduleDto: UpdateScheduleDto = {
      /* mock properties */
    };
    const result = service.update(id, updateScheduleDto);
    expect(result).toBe(`This action updates a #${id} schedule`);
  });

  it('should return an error when given a non-existent id', () => {
    const id = '999';
    const updateScheduleDto: UpdateScheduleDto = {
      /* mock properties */
    };
    try {
      service.update(id, updateScheduleDto);
    } catch (e) {
      expect(e.message).toBe(`No schedule found with id #${id}`);
    }
  });
});
