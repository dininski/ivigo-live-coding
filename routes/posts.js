const Router = require("express").Router;
const BlogPost = require("../database/models/BlogPost");
const User = require("../database/models/User");

const postsRouter = new Router();

postsRouter.post('/new', async function(request, response) {
    const {title, body} = request.body;

    // TODO: get the authenticated author
    const author = await User.findOne({username: 'test'});
    const newBlogPost = new BlogPost({
        title, body, author: author.id
    });

    await newBlogPost.save();
    return response.redirect('/posts');
});

postsRouter.get('/new', async function(request, response) {
    return response.render('posts/new');
});

postsRouter.get("/:postId", async function(request, response) {
  const { postId } = request.params;
  const post = await BlogPost.findOne({ _id: postId });
  return response.render("posts/view", { post });
});

postsRouter.get("/", async function(request, response) {
  const posts = await BlogPost.find({});
  return response.render("posts/index", { posts });
});

module.exports = postsRouter;
