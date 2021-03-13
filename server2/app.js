var express = require('express');
var app = express();
var port = process.env.PORT || 8900;

// middleware
var cors = require('cors');
var bodyParser = require('body-parser');

// connecting to db
var db = require('./db');

// Router

var RegisterRouter = require('./Router/RegisterRouter');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/register', RegisterRouter);

app.listen(port, () => console.log('port started running'));
