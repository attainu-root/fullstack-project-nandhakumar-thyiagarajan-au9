require('dotenv').config({path:"./config.env"});
const express = require('express');
const connectDB = require('./config/db');

//connect db
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is running on port:${PORT}`));