const
    express     = require("express"),
    passport    = require("passport"),
    User        = require("../models/user"),
    router      = express.Router();

// root route
router.get("/",(req, res) => {
    res.render("landing");
});

// AUTH ROUTES
// show the register form
router.get("/register", (req,res) => {
    res.render("register");
});

// handle sign up logic
router.post("/register", (req, res) => { 
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
       if (err || !user) {
           req.flash("error", "User not found. " + err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, () => {
          req.flash("success",`Hello ${user.username}, welcome to YelpCamp!`)
          res.redirect("/campgrounds") ;
       });
   });
});

// show login form
router.get("/login", (req, res) => {
    res.render("login");
});
// handling login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
   req.logout();
   req.flash("success", "Logged you out!")
   res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login");
};

module.exports = router;