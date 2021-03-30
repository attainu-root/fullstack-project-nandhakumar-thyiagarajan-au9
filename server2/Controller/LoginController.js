const User = require("../Schema/RegisterSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

async function logincheck(req, res) {
  res.send(req.cookies);
}

async function postLogin(req, res) {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      const checkPassword = await bcrypt.compareSync(
        req.body.password,
        findUser.password
      );

      if (checkPassword) {
        const token = await jwt.sign({ data: findUser._id }, secret.secret, {
          expiresIn: "20h",
        });

        return res.cookie("token", token).json("");
      } else {
        res.json("INCORRECT PASSWORD");
      }
    } else {
      res.json("EMAIL NOT REGISTERED");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  logincheck,
  postLogin,
};
