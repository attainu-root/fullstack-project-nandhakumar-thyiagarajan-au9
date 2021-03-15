var express = require('express');
var LoginRouter = express.Router();

// login controller
var LoginController = require('../Controller/LoginController');

LoginRouter.route('/').get(LoginController.logincheck);
LoginRouter.route('/').post(LoginController.postLogin);
module.exports = LoginRouter;
