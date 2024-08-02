import { ZodValidationPipe } from '../../common/pipes/zod';
import { updateScheduleSchema } from './update-schedule.dto';

describe('UpdateScheduleDto', () => {
  const pipe = new ZodValidationPipe(updateScheduleSchema);
  const day = 1000 * 60 * 60 * 24;
  const date = new Date(Date.now() + day);

  it('should throw update object is empty.', async () => {
    let result;
    const importInfo = {};
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`Update object cannot be empty`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when agent id is not a number.', async () => {
    let result;
    const importInfo = {
      agentId: '1',
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`agentId Expected number`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when start time is not a date.', async () => {
    let result;
    const importInfo = {
      startTime: '1',
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

  it('should throw when end time is not a date.', async () => {
    let result;
    const importInfo = {
      endTime: '1',
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`endTime must be in the future`);
    }
    expect(result).toBeUndefined();
  });

  it('should throw when account id is not a number.', async () => {
    let result;
    const importInfo = {
      accountId: '1',
    };
    try {
      result = await pipe.transform(importInfo);
    } catch (error) {
      expect(JSON.stringify(error)).toContain(`accountId Expected number`);
    }
    expect(result).toBeUndefined();
  });

  it('should not throw when valid data is provided: accountId', async () => {
    let result;
    const importInfo = {
      accountId: 1,
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual(importInfo);
  });

  it('should not throw when valid data is provided: agentId', async () => {
    let result;
    const importInfo = {
      agentId: 1,
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual(importInfo);
  });

  it('should not throw when valid data is provided: startTime', async () => {
    let result;
    const importInfo = {
      startTime: date.toISOString(),
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual({
      ...importInfo,
      startTime: new Date(importInfo.startTime),
    });
  });

  it('should not throw when valid data is provided: endTime', async () => {
    let result;
    const importInfo = {
      endTime: date.toISOString(),
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual({
      ...importInfo,
      endTime: new Date(importInfo.endTime),
    });
  });

  it('should not throw when valid data is provided.', async () => {
    let result;
    const importInfo = {
      accountId: 1,
      agentId: 1,
      startTime: date.toISOString(),
      endTime: new Date(Date.now() + day * 2).toISOString(),
    };
    result = await pipe.transform(importInfo);
    expect(result).toEqual({
      ...importInfo,
      startTime: new Date(importInfo.startTime),
      endTime: new Date(importInfo.endTime),
    });
  });
});
