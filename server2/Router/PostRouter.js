var express = require('express');
var postRouter = express.Router();

var dotenv = require('dotenv');

dotenv.config();

// var cloudinary = require('../cloudniray/cloudniray');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

postRouter.post('/', async (req, res) => {
  // console.log(req.files.form_file.data);
  var data = {
    image: req.body.data,
  };

  try {
    var upload_image = await cloudinary.uploader.upload(data.image);

    if (upload_image) {
      console.log(upload_image);
      res.send('okay');
    } else {
      console.log('not uploaded');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = postRouter;
