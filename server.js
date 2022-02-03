const express = require("express");

const connexion = require("./db/connect");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

connexion();
const app = express();

app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.get("", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, () => console.log("Server listenning on port 3000..."));
