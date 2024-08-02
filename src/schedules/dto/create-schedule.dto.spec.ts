import { ZodValidationPipe } from '../../common/pipes/zod';
import { createScheduleSchema } from './create-schedule.dto';

describe('CreateScheduleDto', () => {
  const pipe = new ZodValidationPipe(createScheduleSchema);
  const day = 1000 * 60 * 60 * 24;
  const date = new Date(Date.now() + day);

  it('should throw when agent id is not provided.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      // agentId: 1,
      startTime: date.toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`agentId Required`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when agent id is not a number.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: '1',
      startTime: date.toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`agentId Expected number`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when start time is not provided.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      // startTime: date.toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`startTime Invalid date`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when start time is in the past.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: new Date(Date.now() - day).toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(
        `startTime must be in the future`,
      );
    }
    expect(result).toBeUndefined();
  });

  it('should throw when end time is not provided.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: date.toISOString(),
      // endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`endTime Invalid date`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when end time is in the past.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: date.toISOString(),
      endTime: new Date(Date.now() - day).toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`endTime must be in the future`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when end time is before start time.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: new Date(Date.now() + day * 2).toISOString(),
      endTime: new Date(Date.now() + day).toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(
        `endTime cannot be earlier than startTime`,
      );
    }
    expect(result).toBeUndefined();
  });

  it('should throw when account id is not provided.', async () => {
    let result;
    const importInfo = {
      // accountId: 1,
      agentId: 1,
      startTime: date.toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`accountId Required`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when account id is not a number.', async () => {
    let result;
    const importInfo = {
      accountId: '1',
      agentId: 1,
      startTime: date.toISOString(),
      endTime: date.toISOString(),
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`accountId Expected number`);
    }
    expect(result).toBeUndefined();
  });

  it('should not throw when valid data is provided.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: date.toISOString(),
      endTime: new Date(Date.now() + day).toISOString(),
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual({
      ...importInfo,
      startTime: new Date(importInfo.startTime),
      endTime: new Date(importInfo.endTime),
    });
  });
});
