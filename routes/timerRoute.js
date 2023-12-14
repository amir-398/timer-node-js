const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

/**
 * @openapi
 * /{user_id}/timer:
 *   post:
 *     summary: Ajoute un timer pour un utilisateur
 *     description: Enregistre un nouvel enregistrement de temps pour l'utilisateur spécifié
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *                 format: date-time
 *                 description: Le temps à enregistrer
 *     responses:
 *       201:
 *         description: Timer créé avec succès
 *       400:
 *         description: Requête invalide
 *   get:
 *     summary: Obtient les timers d'un utilisateur
 *     description: Renvoie une liste de tous les enregistrements de temps pour l'utilisateur spécifié
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des timers de l'utilisateur
 *       404:
 *         description: Aucun timer trouvé
 */

router
  .route("/:user_id/timer")
  .post(jwtMiddleware.verifyToken, timerController.createATimes)
  .get(jwtMiddleware.verifyToken, timerController.getTimesByUser);

/**
 * @openapi
 * /{user_id}/timer/avg:
 *   get:
 *     summary: Obtient la moyenne des temps d'un utilisateur
 *     description: Calcule et renvoie la moyenne de tous les enregistrements de temps de l'utilisateur spécifié
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Moyenne des temps de l'utilisateur
 *       404:
 *         description: Aucun timer trouvé pour calculer la moyenne
 */

router
  .route("/:user_id/timer/avg")
  .get(jwtMiddleware.verifyToken, timerController.getAverageTimeByUser);

module.exports = router;
