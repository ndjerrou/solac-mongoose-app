const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  email: {
    type: String,
    minLength: 3,
    maxLength: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: true
  }
});

Schema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, "secretkey");
};

const User = mongoose.model("User", Schema);

module.exports = User;
