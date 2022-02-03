const routeur = require("express").Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const User = require("../models/User");
const validate = require("../utilities/authUserValidation");

routeur.post("", async (req, res) => {
  //validate the body?
  const { email, password } = req.body;
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Does the user already exists ?
  let user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = routeur;
