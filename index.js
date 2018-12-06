const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { createTestUser, initialize, createSamplePosts } = require("./database");
const postsRouter = require('./routes/posts');

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(passport.initialize());

app.use('/posts', postsRouter);

app.get("*", function(request, response) {
  response.render("index");
});

initialize(function() {
  console.log("Database connection established!");

  createTestUser()
  .then(createSamplePosts)
  .then(function() {
    app.listen(3000, function() {
        console.log("Application started!");
      });
  }).catch(function(err) {
    console.error(err);
  })
});
