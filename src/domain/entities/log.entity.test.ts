import { LogEntity, LogSeverityLevel } from './log.entity';
describe('log.entity.test.ts', () => {

  const dataObj = {
    origin: 'log.entity.test.ts',
    message: 'Hola Mundo',
    level: LogSeverityLevel.low,
  }

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance from json', () => {
    const jsonString = '{"level":"low","message":"Service https://www.google.com working","createdAt":"2025-01-27T05:40:25.287Z","origin":"check-service.ts"}';
    const log = LogEntity.fromJson(jsonString);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.origin).toBe('check-service.ts');
    expect(log.message).toBe('Service https://www.google.com working');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});