const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressionSession = require("express-session");
const { createTestUser, initialize, createSamplePosts } = require("./database");
const User = require("./database/models/User");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const app = express();

passport.use(
  new LocalStrategy(async function(username, password, done) {
    const user = await User.findOne({ username, password });
    done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(
  expressionSession({
    secret: "ivigo"
  })
);

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.get("*", function(request, response) {
  response.render("index");
});

initialize(function() {
  console.log("Database connection established!");

  createTestUser()
    .then(createSamplePosts)
    .then(function() {
      app.listen(process.env.PORT, function() {
        console.log("Application started!");
      });
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.on("error", function(err) {
  console.error(err);
});
