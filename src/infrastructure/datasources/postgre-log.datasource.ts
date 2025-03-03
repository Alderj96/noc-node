import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

export const severityEnum = {
  [LogSeverityLevel.low]: SeverityLevel.LOW,
  [LogSeverityLevel.medium]: SeverityLevel.MEDIUM,
  [LogSeverityLevel.high]: SeverityLevel.HIGH,
}

export class PostgreLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    await prisma.logModel.create({
      data: {
        level: severityEnum[log.level],
        message: log.message,
        origin: log.origin,
      }
    });
    return;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      }
    });

    return logs.map(LogEntity.fromObject);
  }

}