const router = require("express").Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validate = require("../utilities/newUserValidation");
const verifyToken = require("../middlewares/verifyToken");

router.post("", async (req, res) => {
  const { email, name, password } = req.body;

  // validate with Joy the body
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Does the user already exists ?
  let user = await User.findOne({ email });

  if (user) return res.status(400).send("User already exists");

  user = new User({
    name,
    email,
    password
  });

  await user.save();

  const token = jwt.sign({ _id: _.pick(user, ["_id"]) }, "secretkey");

  res
    .header("x-auth-token", token)
    .status(201)
    .send(_.pick(user, ["name", "email"]));
});

router.get("/me", verifyToken, async (req, res) => {
  const idUser = req.user._id;

  const user = await User.findById(idUser).select("-password");

  res.send(user);
});

module.exports = router;
