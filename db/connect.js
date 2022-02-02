const mongoose = require("mongoose");

module.exports = async () => {
  const url =
    "mongodb+srv://ndjerrou:ndjerrou@db.tounu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  try {
    await mongoose.connect(url);
    console.log("Database connected...");
  } catch (err) {
    console.log(err.message);
  }
};
