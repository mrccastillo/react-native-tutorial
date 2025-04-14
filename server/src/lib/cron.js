import https from "https";
import cron from "cron";

const job = new cron.CronJob("*/14 * * * *", async () => {
  https
    .get(`${process.env.URL}/alive`, (res) => {
      if (res.statusCode === 200) {
        console.log("Cron job executed successfully.");
      } else {
        console.log(`Cron job failed with status code: ${res.statusCode}`);
      }
    })
    .on("error", (e) => {
      console.error(`Error executing cron job: ${e.message}`);
    });
});

export default job;
