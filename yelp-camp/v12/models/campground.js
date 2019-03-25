const
    mongoose            = require("mongoose"),
    schema              = { name        : String,
                            price       : String,
                            image       : String,
                            description : String,
                            author: {   id: {   type:   mongoose.Schema.Types.ObjectId,
                                                ref:    "User"
                                            },
                                        username: String 
                                    },
                            comments    : [ {   type    : mongoose.Schema.Types.ObjectId,
                                                ref     : "Comment"   
                                            } ]
                          },
    campgroundSchema    = new mongoose.Schema(schema);
module.exports = mongoose.model("Campground", campgroundSchema);
