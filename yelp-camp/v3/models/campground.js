const
    mongoose            = require("mongoose"),
    schema              = { name        : String,
                            image       : String,
                            description : String,
                            comments    : [ {   type    : mongoose.Schema.Types.ObjectId,
                                                ref     : "Comment"   }   ]   },
    campgroundSchema    = new mongoose.Schema(schema);
module.exports = mongoose.model("Campground", campgroundSchema);
