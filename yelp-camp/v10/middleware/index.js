// all the middlewares goes here
const
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middlewareObj = { };


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                console.log("log author id ====>>>>" + foundComment)
                // does user own the campground?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        });
      } else {
        // if not redirect    
        res.redirect("back");
      }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not redirect    
                    res.redirect("back");
                }
            }
        });
      } else {
        // otherwise, redirect
        res.redirect("back");
      }
}

module.exports = middlewareObj;