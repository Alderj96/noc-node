import { envs } from "./envs.plugin"

describe('envs.plugin.ts', () => {

  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'geminiano9610@gmail.com',
      MAILER_SECRET_KEY: '123123',
      PROD: false,
      MONGO_URL: 'mongodb://aldoj:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'aldoj',
      MONGO_PASS: '123456789'
    });
  });

  test('should return erro if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
})