const   mongoose = require("mongoose"),
        schema = {  text: String,
                    author: {
                            id: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "User"
                                    },
                            username: String
                    }
                 },
        commentSchema = new mongoose.Schema(schema);
module.exports = mongoose.model("Comment", commentSchema);