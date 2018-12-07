const mongoose = require("mongoose");
const User = require("./models/User");
const BlogPost = require("./models/BlogPost");

const initialize = function(done) {
  mongoose.connect('mongodb://ds127624.mlab.com:27624/heroku_1sdd1s30', {
    auth: {
      user: 'db_user',
      password: 'x3"Lp!3VK6t\\HH~R'
    }});

  const db = mongoose.connection;

  db.once("open", function() {
    done();
  });

  db.on("error", function(error) {
    console.log(error);
  });
};

const createTestUser = async function() {
  const userExists = await User.find({ username: "test" });
  if (userExists.length === 0) {
    const testUser = new User({
      username: "test",
      password: "test"
    });

    await testUser.save();
  }
};

const createSamplePosts = async function() {
  const firstUser = await User.findOne({ username: "test" });

  const posts = await BlogPost.find({});
  if (posts.length < 2) {
    const firstPost = new BlogPost({
      title: "Our first post!",
      body: "Hello world!",
      author: firstUser.get("id")
    });

    await firstPost.save();

    const secondPost = new BlogPost({
      title: "Live coding",
      body: "It takes a little time!",
      author: firstUser.get("id")
    });

    await secondPost.save();
  }
};

module.exports = { initialize, createTestUser, createSamplePosts };
