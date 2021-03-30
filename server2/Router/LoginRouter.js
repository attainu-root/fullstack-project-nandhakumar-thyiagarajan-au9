const express = require("express");
const LoginRouter = express.Router();

// login controller
const LoginController = require("../Controller/LoginController");

LoginRouter.route("/").get(LoginController.logincheck);
LoginRouter.route("/").post(LoginController.postLogin);
module.exports = LoginRouter;
