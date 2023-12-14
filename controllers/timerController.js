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

// get times of user
exports.getTimesByUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const timers = await Timer.find({ user_id: userId });

    if (!timers) {
      return res
        .status(404)
        .json({ message: "Aucun timer trouvé pour cet utilisateur" });
    }

    res.status(200).json(timers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des timers" });
  }
};

// get average time of user
exports.getAverageTimeByUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const timers = await Timer.find({ user_id: userId });

    if (timers.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun timer trouvé pour cet utilisateur" });
    }

    const total = timers.reduce((sum, timer) => sum + timer.time, 0);
    const average = total / timers.length;

    res.status(200).json({ averageTime: average });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors du calcul de la moyenne" });
  }
};
