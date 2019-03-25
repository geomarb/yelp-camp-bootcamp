const
    //requires
    express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    //server data setup
    ip            = process.env.IP,
    port          = process.env.PORT,
    
    app           = express()


// APP CONFIG
mongoose.connect('mongodb://localhost:27017/yelp_camp_v7', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

// LOAD FAKE DATA 
seedDB();

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

// ROUTES

app.get("/",(req, res) => {
    res.render("landing");
});

// RESTFUL ROUTE: INDEX - Display all list
app.get("/campgrounds", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({},(err, campgrounds) => {
        if (err){
            console.log(err);
        } else {
         res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

// RESTFUL ROUTE: CREATE - Add new record
app.post("/campgrounds", (req, res) => {
    //get data from from and add to campgrounds
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {name: name, image: image, description: description};
    
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log("New Campground: ");
            console.log(campground);
            //redirect back to campgrounds pags
            res.redirect("/campgrounds");
         }
    });
});

// RESTFUL ROUTE: NEW - Displays form to add new item (*must be before the SHOW route)
app.get("/campgrounds/new",(req, res) => {
    res.render("campgrounds/new");
});

// RESTFUL ROUTE: SHOW - shows info/detail about an item
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});
// =====================
// COMMENTS ROUTES
// =====================

app.get("/campgrounds/:id/comments/new", isLoggetIn, (req, res) => {
    Campground.findById(req.params.id,(err, foundCampground) => {
        if (err) {
            console.log(err)
        } else {
           res.render("comments/new", {campground: foundCampground}); 
        } 
    });
});

app.post("/campgrounds/:id/comments", isLoggetIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect(`/campgrounds/${req.params.id}`);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});


// AUTH ROUTES
// show the register form
app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", (req, res) => { 
    let newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, (err, user) => {
       if (err) {
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, () => {
          res.redirect("/campgrounds") ;
       });
   });
});

// show login form
app.get("/login", (req, res) => {
    res.render("login");
});
// handling login logic
app.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
});
app.get("/logout", (req, res) => {
   req.logout();
   res.redirect("/campgrounds");
});

// WRONG ROUTES
app.get("*",(req, res) => {
    res.send("page not found");
});

//other functions
function isLoggetIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

//server starter
app.listen(port, ip, () => {
    console.log(`YelpCamp server running at ${ip}:${port}`);
});