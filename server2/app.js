var express = require('express');
var app = express();
var port = process.env.PORT || 8900;

// middleware
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// connecting to db
var db = require('./db');

// Router

var RegisterRouter = require('./Router/RegisterRouter');
var LoginRouter = require('./Router/LoginRouter');

// ? what will this origin will do?
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);

app.listen(port, () => console.log('port started running'));
