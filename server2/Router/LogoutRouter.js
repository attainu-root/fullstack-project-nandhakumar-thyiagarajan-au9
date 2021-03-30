const express = require("express");
const LogoutRouter = express.Router();

LogoutRouter.get("/", (req, res) => {
  console.log("working");
  return res.clearCookie("token").json("delete");
});

module.exports = LogoutRouter;
