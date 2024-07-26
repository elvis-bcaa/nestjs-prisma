import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    // return 'This action adds a new schedule';
    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  findAll() {
    // return `This action returns all schedules`;
    return this.prisma.schedule.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} schedule`;
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  remove(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
