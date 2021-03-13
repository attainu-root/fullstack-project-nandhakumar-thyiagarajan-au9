var express = require('express');

var RegisterRouter = express.Router();

var RegisterController = require('../Controller/RegisterController');

RegisterRouter.route('/').post(RegisterController.postRegister);

module.exports = RegisterRouter;
