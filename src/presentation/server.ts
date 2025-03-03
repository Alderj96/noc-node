import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from '../domain/email/email.service';
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgreLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);
const postgreLogRepository = new LogRepositoryImpl(
  new PostgreLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started!');
    // Mandar email

    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([
    // ])
    // emailService.sendEmailWithFileSystemLogs([
    // ])
    // emailService.sendEmail({
    //   to: 'geminiano_96@hotmail.com',
    //   subject: 'Test email',
    //   htmlBody: '<h1>Test email</h1>',
    // })

    // const logs = await fileSystemLogRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs)

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();
        const url = `http://localhost:3000`;
        // const url = `https://www.google.com`;
        // new CheckService(
        //   fileSystemLogRepository,
        //   () => console.log(`${url} is working!`),
        //   console.error,
        // ).execute(url);
        new CheckServiceMultiple(
          [
            fsLogRepository,
            mongoLogRepository,
            postgreLogRepository,
          ],
          () => console.log(`${url} is working!`),
          console.error,
        ).execute(url);
      }
    );
  }
}