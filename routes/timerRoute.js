const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
// ajouter timer
router.route("/:user_id/timer").post(timerController.createATimes);
module.exports = router;
