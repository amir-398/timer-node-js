const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegister = async (req, res) => {
  try {
    let newUser = new User(req.body);
    let user = await newUser.save();
    res.status(201).json({ message: `Utilisateur crée ${user.email}` });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Requête invalide !" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    // On récupère + vérifie l'email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(500).json({ message: "utilisateur non trouvé" }); //Ici on renvoie une error de type serveur 500 pour une question de sécurité
      return;
    }
    if (user.email == req.body.email && user.password == req.body.password) {
      const userData = {
        id: user.id,
        email: user.email,
        role: "admin",
      };
      // jwt Permet pleins d'options dont: définir l'algo, quand il expire
      const token = await jwt.sign(userData, process.env.JWT_KEY, {
        expiresIn: "10h",
      });
      // S'il n'y a pas d'error on génère le token
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors du traitement" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // L'identifiant de l'utilisateur à supprimer est récupéré de l'URL
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: `Utilisateur supprimé avec succès` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la suppression" });
  }
};

// update user
// ... autres imports et fonctions ...

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // L'identifiant de l'utilisateur à mettre à jour
    const updateData = req.body; // Les données de mise à jour fournies dans le corps de la requête

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: `Utilisateur mis à jour`, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la mise à jour" });
  }
};
