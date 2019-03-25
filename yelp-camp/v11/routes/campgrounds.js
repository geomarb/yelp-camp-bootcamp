const
    express     = require("express"),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"),
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
router.post("/", middleware.isLoggedIn, (req, res) => {
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
            req.flash("error", "Something went wrong. " + err);
        } else {
            //redirect back to campgrounds pags
            req.flash("success", "Successfully added!");
            res.redirect("/campgrounds");
         }
    });
});

// RESTFUL ROUTE: NEW - Displays form to add new item (*must be before the SHOW route)
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// RESTFUL ROUTE: SHOW - shows info/detail about an item
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            req.flash("error", "Something went wrong. ");
            console.log( err.message);
            res.redirect("/campgrounds");
        } else if (!foundCampground) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUD ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            req.flash("error", "Something went wrong. " + err);
            res.redirect(`/campgrounds/${req.params.id}/edit`);
        } else {
            // redirect to show page
            req.flash("success", "Successfully saved!");
            res.redirect(`/campgrounds/${req.params.id}/`);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            // redirect to show page
            req.flash("error", "Something went wrong.");
            console.log(err);
            res.redirect("/campgrounds/");
        } else {
            req.flash("success", "Successfully deleted!");
            res.redirect("/campgrounds/");
        }
    });
});

module.exports = router;