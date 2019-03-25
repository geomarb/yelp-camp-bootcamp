const
    // requiring npm modules
    express             = require("express"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    // requiring data models
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    seedDB              = require("./seeds"),
    // requiring routes
    commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index"),
    // server data setup
    ip              = process.env.IP,
    port            = process.env.PORT,
    // defining app
    app           = express()


// APP CONFIG
mongoose.connect('mongodb://localhost:27017/yelp_camp_v8', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
// seedDB(); // LOAD FAKE DATA 

//PASSPORT CONFIG [LOGIN]
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//ROUTES
app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// WRONG ROUTES
app.get("*",(req, res) => {
    res.send("page not found");
});

//server starter
app.listen(port, ip, () => {
    console.log(`YelpCamp server running at ${ip}:${port}`);
});