// POST
const
    mongoose = require("mongoose"),
    postSchema = mongoose.Schema({  title: String,
                                    content: String });
module.exports = mongoose.model("Post",postSchema);