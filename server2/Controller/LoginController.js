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
        return res.json({ token: token });
      } else {
        res.json({ message: "INCORECT PASSWORD" });
      }
    } else {
      res.json({ message: "INVALID EMAIL" });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  logincheck,
  postLogin,
};
