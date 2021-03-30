const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email: String,
  caption: String,
  file: String,
  likes: Array,
});

mongoose.model("posts", schema);
module.exports = mongoose.model("posts");
