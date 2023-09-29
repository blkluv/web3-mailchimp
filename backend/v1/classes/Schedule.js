const ApiError = require("./ApiError");
const cron = require("node-cron");
const schedule = require("node-schedule");

class Schedule {
  constructor(schedule) {
    this.set(schedule);
  }

  set(schedule) {
    if (typeof schedule !== "undefined") {
      this.id = schedule.id;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */

  read = async (id) => {
    const user = this;
    const promise = new Promise((resolve, reject) => {
      try {
        //cron.schedule("* * * * *", this.scheduleEmail);
        const job = schedule.scheduleJob(
          new Date(Date.now() + 60000),
          this.scheduleEmail
        );
        console.log(job, "wats job?");

        resolve({ ok: "You scheduled a job 1 week into the future" });

        //call this.scheduleEmail
      } catch (e) {
        console.log(e);
        reject("Error scheduling");
      }
    });
    return promise;
  };

  scheduleEmail = async () => {
    try {
      // Perform the desired action here
      console.log("Scheduled Action happened ");
    } catch (error) {
      console.error("Error in scheduled function:", error);
    }
  };
}

module.exports = Schedule;
