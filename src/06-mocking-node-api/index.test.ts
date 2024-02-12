// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCb = jest.fn();
    doStuffByTimeout(mockCb, 500);
    jest.advanceTimersByTime(500);
    expect(mockCb).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const mockCb = jest.fn();
    doStuffByTimeout(mockCb, 500);
    expect(mockCb).not.toBeCalled();
    jest.runOnlyPendingTimers();
    expect(mockCb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(500 * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCb = jest.fn();
    doStuffByInterval(mockCb, 500);
    expect(mockCb).not.toBeCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(joinSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const existsSyncMock = jest.spyOn(fs, 'existsSync');
    existsSyncMock.mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existsSyncMock = jest.spyOn(fs, 'existsSync');
    existsSyncMock.mockReturnValue(true);

    const readFileMock = jest.spyOn(fs.promises, 'readFile');
    readFileMock.mockResolvedValue('test content');

    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe('test content');
  });
});
