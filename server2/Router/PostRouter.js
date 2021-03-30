const express = require("express");
const postRouter = express.Router();

// importing controller
const postController = require("../Controller/PostController");

postRouter.get("/", postController.fetchpost);

postRouter.post("/", postController.createpost);

postRouter.post("/checklikes", postController.checklikes);

postRouter.post("/togglelike", postController.togglelike);

postRouter.get("/update/:id", postController.updatecheck);

postRouter.patch("/updated", postController.updated);

postRouter.delete("/deletepost/:id", postController.deletepost);

module.exports = postRouter;
