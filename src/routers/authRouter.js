const { Router } = require("express");
const debug = require("debug")("app:authRouter");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const authRouter = Router();

require("../utils/passport.js");

authRouter.get("/login", (req, res, next) => {
  debug("authRouter.get('/login')");
  const redirect_url = req.query.redirect_url;
  // const redirect_url = req.headers.redirect_url? req.headers.redirect_url : req.query.redirect_url;
  // const redirect_url = req.headers.redirect_url;
  debug("redirect_url:", redirect_url)

  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state: redirect_url,
  });
  authenticator(req, res, next);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    debug("authRouter.get('/google/callback')");
    const { state } = req.query;
    const redirect_url = state ?? "/api";

    const id = req.user._id.toString();

    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    console.log("token:", token);
    
    res.setHeader("Authorization", `Bearer ${token}`);
    res.redirect(`${redirect_url}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  debug("authRouter.get('/logout')");
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
