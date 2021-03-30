const secret = require("../config/secret");
const jsonwebtoken = require("jsonwebtoken");
const postcollection = require("../Schema/PostSchema");
const collection = require("../Schema/RegisterSchema");

// creating post and saving in database
async function createpost(req, res) {
  try {
    console.log(req.body);
    const decode = await jsonwebtoken.decode(req.cookies.token, secret.secret);

    const user = await collection.findById(decode.data);
    const userEmail = user.email;
    const post = {
      email: userEmail,
      caption: req.body.caption,
      likes: [],
      file: req.body.file,
    };

    const createPost = await postcollection.create(post);
    const allpost = await postcollection.find();
    return res.json(allpost);
  } catch (error) {
    console.log(error);
  }
}

async function fetchpost(req, res) {
  try {
    const allPosts = await postcollection.find();
    return res.json(allPosts);
  } catch (error) {
    console.log(error);
  }
}

async function checklikes(req, res) {
  try {
    const user = await jsonwebtoken.decode(req.cookies.token, secret.secret);
    const postdetails = await postcollection.findById(req.body._id);
    const likesArray = postdetails.likes;
    const noOflikes = likesArray.length;
    const result = likesArray.includes(user.data);
    if (result) {
      res.json({ toggle: "UNLIKE", noOflikes });
    } else {
      res.json({ toggle: "LIKE", noOflikes });
    }
  } catch (error) {
    console.log(error);
  }
}

async function togglelike(req, res) {
  try {
    const user = await jsonwebtoken.decode(req.cookies.token, secret.secret);
    const post = await postcollection.findById(req.body._id);
    const { likes, id, email, caption, file } = post;
    if (req.body.toggle === "LIKE") {
      likes.push(user.data);
      const updatedpost = { likes, id, email, caption, file };
      const updatePost = await postcollection.findByIdAndUpdate(
        req.body._id,
        updatedpost,
        { new: true }
      );

      return res.json({ toggle: "UNLIKE", noOflikes: updatePost.likes.length });
    }
    if (req.body.toggle === "UNLIKE") {
      const updatelike = likes.filter((item) => item !== user.data);
      const updatedlike = { likes: updatelike, id, email, caption, file };
      const updatedPost = await postcollection.findByIdAndUpdate(
        req.body._id,
        updatedlike,
        { new: true }
      );
      return res.json({ toggle: "LIKE", noOflikes: updatedPost.likes.length });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updatecheck(req, res) {
  try {
    const { data } = await jsonwebtoken.decode(
      req.cookies.token,
      secret.secret
    );
    const { email: userEmail } = await collection.findById(data);
    const { email: postEmail } = await postcollection.findById(req.params.id);
    if (userEmail === postEmail) {
      return res.json({ update: "UPDATE" });
    } else {
      return res.json({ update: "" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updated(req, res) {
  try {
    const update = await postcollection.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );

    const allPost = await postcollection.find();
    return res.json(allPost);
  } catch (error) {
    console.log(error);
  }
}

async function deletepost(req, res) {
  try {
    // console.log(req.params.id);
    const postid = req.params.id;
    const deletepost = await postcollection.findByIdAndDelete(postid);
    if (deletepost) {
      const allpost = await postcollection.find();
      return res.json(allpost);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createpost,
  fetchpost,
  checklikes,
  togglelike,
  updatecheck,
  updated,
  deletepost,
};
