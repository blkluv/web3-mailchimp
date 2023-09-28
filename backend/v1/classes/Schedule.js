const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class Schedule {
  constructor(schedule) {
    this.set(schedule);
  }

  set(schedule) {
    if (typeof schedule !== "undefined") {
      this.id = schedule.id;
      this.status = schedule.status;
      this.user_id = schedule.user_id;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */

  create = async () => {
    console.log("create cron job schedule here");
  };
  /*   create = async () => {
    const schedule = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "SELECT COUNT(*) AS count FROM `schedule` WHERE user_id = ? AND schedule_symbol_id = ?",
          [schedule.user_id, schedule.schedule_symbol_id],
          (err, results) => {
            if (err) {
              reject(new ApiError(500, err));
              db.release();
              return;
            }
            const rowCount = results[0].count;

            if (rowCount > 0) {
              // Update existing row
              db.query(
                "UPDATE `schedule` SET status=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=? WHERE user_id=? AND schedule_symbol_id=?;",
                [
                  "in_progress",
                  schedule.level,
                  schedule.artist_name,
                  schedule.level_4_claimed_prizes,
                  schedule.level_5_claimed_prizes,
                  schedule.level_6_claimed_main_prize,
                  schedule.claimable_prize_count,
                  schedule.user_id,
                  schedule.schedule_symbol_id,
                ],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else if (results.affectedRows < 1) {
                    reject(new ApiError(404, "schedule not found!"));
                  } else {
                    resolve(schedule);
                  }
                  db.release();
                }
              );
            } else {
              // Insert new row
              db.query(
                "INSERT INTO `schedule` (status, user_id, level, artist_name, level_4_claimed_prizes, level_5_claimed_prizes, level_6_claimed_main_prize, claimable_prize_count, schedule_symbol_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP());",
                [
                  "in_progress",
                  schedule.user_id,
                  1,
                  schedule.artist_name,
                  schedule.level_4_claimed_prizes,
                  schedule.level_5_claimed_prizes,
                  schedule.level_6_claimed_main_prize,
                  schedule.claimable_prize_count,
                  schedule.schedule_symbol_id,
                ],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else {
                    schedule.id = results.insertId;
                    resolve(schedule);
                  }
                  db.release();
                }
              );
            }
          }
        );
      });
    });
    return promise;
  }; */

  read = async (id) => {
    const schedule = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `schedule` where user_id = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "schedule not found"));
              } else {
                schedule.set(results[0]);
                resolve(schedule);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing schedule id"));
      }
    });
    return promise;
  };

  update = async () => {
    const schedule = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `schedule` SET status=?, user_id=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=?, schedule_symbol_id=? WHERE id=?;",
          [
            schedule.status,
            schedule.user_id,
            schedule.level,
            schedule.artist_name,
            schedule.level_4_claimed_prizes,
            schedule.level_5_claimed_prizes,
            schedule.level_6_claimed_main_prize,
            schedule.claimable_prize_count,
            schedule.schedule_symbol_id,
            schedule.id,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "schedule not found!"));
            } else {
              resolve(schedule);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  delete = async (id) => {
    const schedule = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        this.MySQL.pool.getConnection((err, db) => {
          db.execute(
            "delete from `schedule` where `id` = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(400, "Nothing deleted"));
              } else {
                resolve();
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(400, "Missing schedule id"));
      }
    });
    return promise;
  };

  readscheduleByUserId = async (userId, scheduleNumberId, helper) => {
    const schedule = this;
    const promise = new Promise((resolve, reject) => {
      if (userId) {
        MySQL.pool.getConnection((err, db) => {
          if (scheduleNumberId) {
            db.execute(
              "SELECT * FROM `schedule` WHERE user_id = ? AND schedule_symbol_id = ?",
              [userId, scheduleNumberId],
              (err, results, fields) => {
                if (err) {
                  reject(new ApiError(500, err));
                } else if (results.length < 1) {
                  if (helper) {
                    resolve(null);
                  } else {
                    reject(new ApiError(404, "schedule not found"));
                  }
                } else {
                  schedule.set(results[0]);
                  resolve(results[0]);
                }
                db.release();
              }
            );
          } else {
            db.execute(
              "select * from `schedule` where user_id = ?",
              [userId],
              (err, results, fields) => {
                if (err) {
                  reject(new ApiError(500, err));
                } else if (results.length < 1) {
                  reject(new ApiError(404, "schedule not found"));
                } else {
                  schedule.set(results[0]);
                  resolve(results);
                }
                db.release();
              }
            );
          }
        });
      } else {
        reject(new ApiError(500, "Missing user id"));
      }
    });
    return promise;
  };
  getLeaderboardData = async (scheduleId) => {
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.execute(
          "SELECT level, COUNT(DISTINCT user_id) AS userCount FROM `schedule` WHERE schedule_symbol_id = ? GROUP BY level",
          [scheduleId],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              const leaderboardData = {};
              results.forEach((row) => {
                leaderboardData[`level${row.level}`] = row.userCount;
              });
              resolve(leaderboardData);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  readUserByWalletAddress = async (address) => {
    const promise = new Promise((resolve, reject) => {
      if (address) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "SELECT * FROM `user` WHERE public_address = ?",
            [address],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "User with wallet address not found"));
              } else {
                resolve(results[0]);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing wallet address"));
      }
    });
    return promise;
  };

  getLevelBurnStatus = async (scheduleId, levelId, userAddress) => {
    const promise = new Promise((resolve, reject) => {
      if (scheduleId > 0 && levelId > 0 && userAddress != "") {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "SELECT * FROM `level_burn_status` WHERE user_address = ? AND level_id = ? AND schedule_id = ?;",
            [userAddress, levelId, scheduleId],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "Burn status not found for request"));
              } else {
                resolve(results[0]);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Params not valid"));
      }
    });
    return promise;
  };

  updateLevelBurnStatus = async () => {
    const levelBurnData = this;
    const promise = new Promise((resolve, reject) => {
      this.MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `level_burn_status` SET status=?, last_block=?, WHERE WHERE user_address = ? AND level_id = ? AND schedule_id = ?;",
          [
            levelBurnData.status,
            levelBurnData.lastBlock,
            levelBurnData.userAddress,
            levelBurnData.levelId,
            levelBurnData.scheduleId,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Record not found!"));
            } else {
              resolve(schedule);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };
}

module.exports = Schedule;
