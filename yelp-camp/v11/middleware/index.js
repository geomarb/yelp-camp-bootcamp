// all the middlewares goes here
const
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middlewareObj = { };


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", "Something went wrong.");
                console.log(err.message);
                res.redirect("back");
            } else if (!foundComment) {
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // otherwise, redirect
                    req.flash("error", "You don't have permession to do that!")
                    res.redirect("back");
                }
            }
        });
      } else {
        // if not redirect    
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
      }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash("error", "Something went wrong.");
                console.log(err.message)
                res.redirect("back");
            } else if (!foundCampground){
                req.flash("error", "Campground not found. ");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not redirect    
                    req.flash("error", "You don't have permession to do that!")
                    res.redirect("back");
                }
            }
        });
      } else {
        // otherwise, redirect
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
      }
}

module.exports = middlewareObj;