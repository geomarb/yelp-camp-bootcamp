const   express                 = require("express"),
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        bodyParser              = require("body-parser"),
        User                    = require("./models/user"),
        LocalStratety           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),

        port                    = process.env.PORT,
        ip                      = process.env.IP,
        app = express();

mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratety(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
// ==============
app.get("/",(req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

// Auth Routes

//show sign up form
app.get("/register", (req, res) => {
    res.render("register");
});
//handling user sign up
app.post("/register", (req, res) => {
    console.log("/register 1");
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
    console.log("/register err");
            console.log(err);
            return res.render('register');
        } 
    console.log("/register 2");
    
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
// render login form
app.get("/login",(req, res) => {
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

app.listen(port, ip, () => {
    console.log(`Auth SS server is running at ${ip}:${port}`);
});