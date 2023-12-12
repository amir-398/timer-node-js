const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

// Route pour l'ajoute d'un utilisateur
router.route("/register").post(userController.userRegister);

// Route pour la connexion utilisateur
router.route("/login").post(userController.userLogin);

// Route pour la suppression
router
  .route("/:id")
  .delete(jwtMiddleware.verifyToken, userController.deleteUser)
  .put(jwtMiddleware.verifyToken, userController.updateUser);

module.exports = router;
