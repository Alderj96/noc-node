import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from '../domain/email/email.service';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start(): void {
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

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const date = new Date();
    //     const url = `http://localhost:3000`;
    //     // const url = `https://www.google.com`;
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is working!`),
    //       console.error,
    //     ).execute(url);
    //   }
    // );
  }
}