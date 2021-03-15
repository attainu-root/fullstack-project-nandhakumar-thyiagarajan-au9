var User = require('../Schema/RegisterSchema');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');

async function logincheck(req, res) {
  // console.log(req.cookies());
  res.send(req.cookies);
}

async function postLogin(req, res) {
  try {
    var findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      var checkPassword = await bcrypt.compareSync(
        req.body.password,
        findUser.password
      );

      if (checkPassword) {
        var token = await jwt.sign({ data: findUser._id }, secret.secret, {
          expiresIn: '20h',
        });

        return res.cookie('token', token).json('');
      } else {
        res.json('INCORRECT PASSWORD');
      }
    } else {
      res.json('EMAIL NOT REGISTERED');
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  logincheck,
  postLogin,
};
