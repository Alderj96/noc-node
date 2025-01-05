import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start(): void {
    console.log('Server started!');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();
        const url = `http://localhost:3000`;
        // const url = `https://www.google.com`;
        new CheckService(
          () => console.log(`${url} is working!`),
          console.error,
        ).execute(url);
      }
    );
  }
}