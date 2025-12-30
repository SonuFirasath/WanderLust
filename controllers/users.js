const User = require("../models/user");

// render Sign Up Form

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Sign Up user using Post
module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", `Welcome to Wanderlust ${username}`);
        res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
};

// Render Login Form

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login

module.exports.login = (req, res) => {
    let{username} = req.body;
    req.flash("success",`Welcome back to WanderLust ${username}`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout 

module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success",`You are now Logged Out`);
    res.redirect("/listings");
  });
};