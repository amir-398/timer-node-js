const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.route("/register").post(userController.userRegister);

router.route("/login").post(userController.userLogin);

// Route pour la suppression d'un utilisateur
router
  .route("/:id")
  .delete(userController.deleteUser)
  .put(userController.updateUser);

module.exports = router;
