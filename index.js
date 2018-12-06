const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const BasicStrategy = require("passport-local").Strategy;

const app = express();

passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
})

passport.use(
  new BasicStrategy(function(username, password, done) {
    return done(null, { username, password });
  })
);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(passport.initialize());

app.get("*", function(request, response) {
  response.render("index");
});

app.listen(3000, function() {
  console.log("Application started!");
});
