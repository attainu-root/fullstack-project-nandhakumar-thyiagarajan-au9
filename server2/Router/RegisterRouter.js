const express = require("express");

const RegisterRouter = express.Router();

const RegisterController = require("../Controller/RegisterController");

RegisterRouter.route("/").post(RegisterController.postRegister);

module.exports = RegisterRouter;
