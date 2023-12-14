const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");
// ajouter timer
router
  .route("/:user_id/timer")
  .post(jwtMiddleware.verifyToken, timerController.createATimes)
  .get(jwtMiddleware.verifyToken, timerController.getTimesByUser);

router
  .route("/:user_id/timer/avg")
  .get(jwtMiddleware.verifyToken, timerController.getAverageTimeByUser);
module.exports = router;
