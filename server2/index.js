const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

// middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// connecting to db
var db = require("./db");

// Router

const RegisterRouter = require("./Router/RegisterRouter");
const LoginRouter = require("./Router/LoginRouter");
const postRouter = require("./Router/PostRouter");
const LogoutRouter = require("./Router/LogoutRouter");
const ForgotRouter = require("./Router/Forgotpassword");

app.use(
  cors({
    credentials: true,
    origin: "https://instax-frontend.herokuapp.com",
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.get("/health", (req, res) => {
  return res.send("health okay");
});
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);
app.use("/post", postRouter);
app.use("/logout", LogoutRouter);
app.use("/forgotpassword", ForgotRouter);

app.listen(port, () => console.log("port started running"));
