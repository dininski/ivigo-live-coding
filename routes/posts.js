const Router = require("express").Router;
const BlogPost = require("../database/models/BlogPost");
const Comment = require("../database/models/Comment");
const authorized = require("../middleware/authorized");

const postsRouter = new Router();

postsRouter.post("/new", authorized, async function(request, response) {
  const { title, body } = request.body;

  const newBlogPost = new BlogPost({
    title,
    body,
    author: request.session.passport.user._id
  });

  await newBlogPost.save();
  return response.redirect("/posts");
});

postsRouter.post("/:postId/comment", authorized, async function(
  request,
  response
) {
  const { body } = request.body;

  const newComment = new Comment({
    body,
    author: request.session.passport.user._id
  });

  await newComment.save();
  return response.redirect(request.path);
});

postsRouter.get("/new", async function(request, response) {
  return response.render("posts/new");
});

postsRouter.get("/:postId", async function(request, response) {
  var user = request.session && request.session.passport && request.session.passport.user;
  const { postId } = request.params;
  const post = await BlogPost.findOne({ _id: postId })
    .populate("author")
    .exec();

  const comments = await Comment.find({}).populate('author').exec();

  return response.render("posts/view", { post, user, comments });
});

postsRouter.get("/", async function(request, response) {
  const posts = await BlogPost.find({});
  return response.render("posts/index", { posts });
});

module.exports = postsRouter;
