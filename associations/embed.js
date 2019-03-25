const
    // imported libraries
    mongoose = require("mongoose"),
    // POST
    postSchema = mongoose.Schema({  title: String,
                                    content: String }),
    Post = mongoose.model("Post",postSchema),
    // USER
    userSchema = new mongoose.Schema({  email: String,
                                        name: String,
                                        posts: [postSchema]
    }),
    User = mongoose.model("User", userSchema);

mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

// // new user
// const newUser = new User({  email: "hermione@hogwarts.edu",
//                             name: "Hermione Granger"    });
// newUser.posts.push({    title: "How to bre polyjuice potion",
//                         content: "Just kidding. Go to potions class to learn it!"    });
                          
// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user)
//     }
// });

// // new post
// const newPost = new Post({    title: "Reflections on Apples",
//                             content: "They are delicius"    })
// newPost.save((err,post) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Hermione Granger"}, (err, user) => {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort. Voldemort. Voldemort."
        });
        user.save((err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        })
    }
});