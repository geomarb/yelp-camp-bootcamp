const
    express     = require("express"),
    Campground  = require("../models/campground"),
    router      = express.Router();

// RESTFUL ROUTE: INDEX - Display all list
router.get("/", (req, res) => {
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
router.post("/", isLoggedIn, (req, res) => {
    //get data from from and add to campgrounds
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image: image, description: description, author: author};
    
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds pags
            res.redirect("/campgrounds");
         }
    });
});

// RESTFUL ROUTE: NEW - Displays form to add new item (*must be before the SHOW route)
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// RESTFUL ROUTE: SHOW - shows info/detail about an item
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;