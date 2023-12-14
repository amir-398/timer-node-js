const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     description: Crée un nouveau compte utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de requête
 */

router.route("/register").post(userController.userRegister);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: Connecte un utilisateur en vérifiant son email et mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie et token renvoyé
 *       401:
 *         description: Authentification échouée
 */

router.route("/login").post(userController.userLogin);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur spécifié par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *   put:
 *     summary: Met à jour un utilisateur
 *     description: Met à jour les informations d'un utilisateur spécifié par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */

router
  .route("/:id")
  .delete(jwtMiddleware.verifyToken, userController.deleteUser)
  .put(jwtMiddleware.verifyToken, userController.updateUser);

module.exports = router;
