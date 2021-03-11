var express = require('express');
var app = express();
var port = process.env.PORT || 8900;
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log('port started running'));
