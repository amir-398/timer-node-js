exports.createATimes = async (req, res) => {
  try {
    await Timer.findById(req.params.user_id);
    const newUser = new Timer({
      ...req.body,
      timer_id: req.params.user_id,
    });

    try {
      const Times = await newUser.save();
      res.status(201).json(Times);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur (db)." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur (post inexistant)." });
  }
};
