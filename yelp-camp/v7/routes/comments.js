const
    express = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    router  = express.Router();

// Comments New
router.get("/new", isLoggetIn, (req, res) => {
    Campground.findById(req.params.id,(err, foundCampground) => {
        if (err) {
            console.log(err)
        } else {
           res.render("comments/new", {campground: foundCampground}); 
        } 
    });
});

// Comments Create
router.post("/", isLoggetIn, (req, res) => {
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

//middleware
function isLoggetIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;