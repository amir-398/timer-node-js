const Timer = require("../models/timerModel");

exports.createATimes = async (req, res) => {
  try {
    const newUserTimer = new Timer({
      ...req.body,
      user_id: req.params.user_id, // Utiliser user_id de l'URL
    });

    const newTimer = await newUserTimer.save();
    res.status(201).json(newTimer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur (db)." });
  }
};
