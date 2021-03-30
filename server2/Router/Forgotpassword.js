const express = require("express");
const ForgotRouter = express.Router();
const ForgotController = require("../Controller/ForgotController");

ForgotRouter.post("/emailcheck", ForgotController.emailcheck);

ForgotRouter.post("/verification", ForgotController.verification);

ForgotRouter.post("/newpassword", ForgotController.newpassword);

module.exports = ForgotRouter;
