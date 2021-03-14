var User = require('../Schema/RegisterSchema');

var bcrypt = require('bcrypt');

async function postRegister(req, res) {
  try {
    var userfind = await User.findOne({ email: req.body.email });
    if (userfind) {
      // if email is already present in db
      res.status(401).json('EMAIL ALREADY USED');
    } else {
      // bcrypting password
      var hashedPasssword = await bcrypt.hashSync(req.body.password, 10);
      // userdata
      var userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPasssword,
      };
      // creating user in db
      var createUser = await User.create(userData);

      if (createUser) {
        res.status(200).json('');
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  postRegister,
};
