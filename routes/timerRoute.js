const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
// ajouter timer
router.route("/:id/timer").post(timerController.createATimes);
