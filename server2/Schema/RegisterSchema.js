const mongoose = require("mongoose");
const schema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

mongoose.model("users", schema);
module.exports = mongoose.model("users");
