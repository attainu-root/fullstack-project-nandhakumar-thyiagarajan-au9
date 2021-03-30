const User = require("../Schema/RegisterSchema");

const bcrypt = require("bcrypt");

async function postRegister(req, res) {
  try {
    const userfind = await User.findOne({ email: req.body.email });
    if (userfind) {
      // if email is already present in db
      res.status(401).json("EMAIL ALREADY USED");
    } else {
      // bcrypting password
      const hashedPasssword = await bcrypt.hashSync(req.body.password, 10);
      // userdata
      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPasssword,
      };
      // creating user in db
      const createUser = await User.create(userData);

      if (createUser) {
        res.status(200).json("");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  postRegister,
};
