const users = require("../Schema/RegisterSchema");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
let secret;
let email;
const bcrypt = require("bcrypt");
const { update } = require("../Schema/RegisterSchema");
async function emailcheck(req, res) {
  try {
    const check = await users.findOne({ email: req.body.email });
    if (check) {
      email = req.body.email;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nandhakumar19984@gmail.com",
          pass: "thilagavathi888",
        },
      });

      secret = uuidv4();

      const mailOptions = {
        from: "nandhakumar19984@gmail.com",
        to: req.body.email,
        subject: "VERIFICATION CODE",
        text: secret,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({ email: "PRESENT" });
    } else {
      return res.json({ email: "NOT PRESENT" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function verification(req, res) {
  try {
    if (secret === req.body.data) {
      return res.json({ data: "VERIFIED" });
    } else {
      return res.json({ data: "NOT VERIFIED" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function newpassword(req, res) {
  try {
    const hashedPasssword = await bcrypt.hashSync(req.body.data, 10);
    const updatepassword = await users.findOneAndUpdate(
      { email: email },
      { password: hashedPasssword }
    );
    return res.json({ data: "OKAY" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  emailcheck,
  verification,
  newpassword,
};
