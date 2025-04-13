import mongoose from "mongoose"
import { MongoDatabase } from "./init"

describe('init MongoDB', () => {

  afterAll(() => {
    mongoose.connection.close();
  })

  test('should connect to mongodb', async () => {
    const connection = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    })

    expect(connection).toBeTruthy();
  })

  test('should throw an error', async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://aldoj:1234563772864@localhost:27017/',
        dbName: process.env.MONGO_DB_NAME!,
      })
      expect(true).toBe(false)
    } catch (error) {
    }
  })
})