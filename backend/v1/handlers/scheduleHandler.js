"use strict";

var ApiError = require("../classes/ApiError");
const { helperFindArtistNumberIdByTokenId } = require("../helper");
const websocketService = require("../services/WebsocketService");
const Schedule = require("../classes/Schedule");

var scheduleHandler = {};

scheduleHandler.create = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;

  var schedule = new Schedule();
  schedule.create().then(
    (schedule) => {
      res.status(200).send(schedule);
    },
    (reason) => {
      res.status(400).send(new ApiError(400, reason));
    }
  );
};

scheduleHandler.read = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;

  if (id) {
    if (id == id) {
      var schedule = new Schedule();
      schedule.read(id).then(
        (schedule) => {
          res.status(200).send(schedule);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, scheduleid does not match"));
    }
  }
};

scheduleHandler.readschedulesByUserId = function (req, res) {
  const userid = Number(req.params.userid);
  const scheduleNumberId = Number(req.params.artistNumberId);
  const userIdFromSession = Number(req.user.id);
  userid === userIdFromSession;

  if (userid) {
    if (userid === userIdFromSession) {
      var schedule = new schedule();
      schedule.readscheduleByUserId(userid, scheduleNumberId).then(
        (schedule) => {
          res.status(200).send(schedule);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, scheduleid does not match"));
    }
  }
};

scheduleHandler.getLeaderboardData = function (req, res) {
  const scheduleId = Number(req.params.schedule_symbol_id);
  if (scheduleId) {
    var schedule = new schedule();
    schedule.getLeaderboardData(scheduleId).then(
      (schedule) => {
        res.status(200).send(schedule);
      },
      (reason) => {
        res.status(400).send(new ApiError(400, reason));
      }
    );
  } else {
    res
      .status(403)
      .send(new ApiError(403, "Access denied, scheduleid does not match"));
  }
};

scheduleHandler.create = function (req, res) {
  var schedule = new schedule();
  schedule.set(req.body); // should be a schedule object

  if (req.body.user_id === req.user.id) {
    schedule.create().then(
      (schedule) => {
        res.status(200).send(schedule);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  }
};

scheduleHandler.update = function (req, res) {
  var schedule = new schedule();
  schedule.set(req.body);
  const userid = Number(req.params.userid);
  //const userIdFromSession = req.user.id;
  if (userid) {
    schedule.update().then(
      (schedule) => {
        res.status(200).send(schedule);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied, update"));
  }
};

scheduleHandler.delete = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;
  if (id == id) {
    var schedule = new schedule();
    schedule.read(id).then(
      (schedule) => {
        schedule.delete().then(
          (result) => {
            res.status(200).send({});
          },
          (reject) => {
            res.status(400).send(new ApiError(400, reject));
          }
        );
      },
      (reason) => {
        res.status(400).send(new ApiError(400, reason));
      }
    );
  } else {
    res
      .status(403)
      .send(new ApiError(403, "Access denied for delete schedule"));
  }
};

scheduleHandler.webhook = async function (req, res) {
  console.log(req.body, "req body???");

  const { status, tokenIds, passThroughArgs, walletAddress, txId } = req.body;
  const argsDeserialized = JSON.parse(passThroughArgs);
  const argsDeseralisedSecond = JSON.parse(argsDeserialized);
  const argsDeseralisedThird = JSON.parse(argsDeseralisedSecond);

  console.log(
    argsDeserialized,
    "decentralized",
    typeof argsDeseralisedSecond,
    typeof argsDeseralisedThird,
    argsDeseralisedThird
  );
  const userId = argsDeseralisedThird.id;
  console.log(userId, "USERID??");
  if (status === "success") {
    websocketService.send([userId], "crossmint_success", {
      tokenId: tokenIds,
      status,
      walletAddress,
      txId,
    });

    res.status(200).send({});
  } else {
    res.status(400).send(new ApiError(400, reason));
  }
};

scheduleHandler.getLevelSettings = async function (req, res) {
  var levelSetting = new LevelSetting();
  try {
    const settings = await levelSetting.getAll();
    res.status(200).send(settings);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

scheduleHandler.getBurnStatus = async function (req, res) {
  const { scheduleId, levelId, userAddress } = req.params;
  // Check DB for burn status
  try {
    var burn = new Burn();
    const burnRecord = await burn.getLevelBurnStatus(
      scheduleId,
      levelId,
      userAddress
    );
    if (!burnRecord.status) {
      //("after lookUp > burnRecord not seen ")
      try {
        const { status, lastBlock } = await getBurnStatus(
          scheduleId,
          levelId,
          userAddress,
          burnRecord.last_block
        );
        // Save to DB => Update last block_number and new burn status
        burn.set({
          status,
          lastBlock,
          userAddress: userAddress,
          levelId: levelId,
          scheduleId,
        });
        //("after lookUp > burnRecord not seen ", lastBlock)
        await burn.updateLevelBurnStatus();
        //("after lookUp > burnRecord not seen; after db update ")
        return res.status(200).send(status);
      } catch (error) {
        console.log("after lookUp > burnRecord not seen ", error);
        return res.status(400).send(new ApiError(400, error.message + "--"));
      }
    }
    //("after lookUp > burnRecord saw ", burnRecord.status)
    return res.status(200).send(burnRecord.status == 1 ? true : false);
  } catch (error) {
    if (error.ApiErrorcode == 404) {
      // Query chain event
      try {
        const { status, lastBlock } = await getBurnStatus(
          scheduleId,
          levelId,
          userAddress,
          0
        );

        //("after getBurnStatus > ", lastBlock)
        // Save to DB => Update last block_number and new burn status
        burn.status = status;
        burn.lastBlock = lastBlock;
        burn.userAddress = userAddress;
        burn.levelId = levelId;
        burn.scheduleId = scheduleId;
        //("before createLevelBurnStatus")
        await burn.createLevelBurnStatus();
        return res.status(200).send(status);
      } catch (error) {
        return res.status(400).send(new ApiError(400, error.message + "---"));
      }
    }
    return res.status(400).send(new ApiError(400, error.message + "----"));
  }
};

module.exports = scheduleHandler;
