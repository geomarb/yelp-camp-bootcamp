const   mongoose = require("mongoose"),
        schema = {  text: String,
                    author: String  },
        commentSchema = new mongoose.Schema(schema);
module.exports = mongoose.model("Comment", commentSchema);