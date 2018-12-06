const Router = require("express").Router;
const passport = require("passport");
const User = require("../database/models/User");

const usersRouter = new Router();

usersRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  function(request, response) {
    return response.redirect("/posts/new");
  }
);

usersRouter.post("/register", async function(request, response) {
  const { username, password } = request.body;

  const newUser = new User({
    username,
    password
  });

  await newUser.save();
  return response.redirect("/users/login");
});

usersRouter.get("/login", function(request, response) {
  return response.render("users/login");
});

usersRouter.get("/register", function(request, response) {
  return response.render("users/register");
});

module.exports = usersRouter;
