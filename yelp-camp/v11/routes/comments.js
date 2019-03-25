const
    express = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"),
    router  = express.Router({mergeParams: true});

// Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, foundCampground) => {
        if (err) {
            req.flash("error", "Something went wrong. " + err);
        } else {
           res.render("comments/new", {campground: foundCampground}); 
        } 
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash("error", "Something went wrong. " + err);
            res.redirect(`/campgrounds/${req.params.id}`);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong. " + err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added!");
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// EDIT comment ROUTE
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            req.flash("error", "Something went wrong.");
            console.log(err.message);
            res.redirect("back");
        } else if (!foundComment) {
            req.flash("error", "Comment not found.");
            res.redirect("back");
        } else {
            res.render(`comments/edit`, {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE comment ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // find and update the correct campground
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            req.flash("error", "Something went wrong. ");
            console.log(err);
            res.redirect("back");
        } else if (!updatedComment) {
            req.flash("error", "Comment not found.");
            res.redirect("back");
        } else {
            // redirect to show page
            req.flash("success", "Successfully saved!");
            res.redirect(`/campgrounds/${req.params.id}/`);
        }
    });
});

// DESTROY comment ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            // redirect to show page
            req.flash("error", "Something went wrong. " + err);
            res.redirect("back");
        } else {
            req.flash("success", "Successfully delted!");
            res.redirect(`/campgrounds/${req.params.id}/`);
        }
    });
});

module.exports = router;