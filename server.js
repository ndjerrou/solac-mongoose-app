const express = require("express");

const connexion = require("./db/connect");
const Cat = require("./model/Cat");

connexion();

const app = express();

app.use(express.json());

app.get("", (req, res) => {
  res.send("Welcome");
});

app.post("/api/cats", async (req, res) => {
  const Alex = new Cat({ name: req.body.name });

  try {
    await Alex.save();
    return res.status(201).send({ message: true, data: Alex });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Server listenning on port 3000..."));

// 1 créer un compte sur mongodb atlas
// 2 Network acces ==> Allow all ip access
// 3 Récupérer l'url de connexion avec l'onglet 'Connect your application'
// 4 Se connecter à la DB à l'aide du package mongoose
// 5 Utiliser les variables d'env. aussi bien pour l'url de connexion que pour les identifiants user
// 6 Lancer la connexion depuis le fichier boostrap
