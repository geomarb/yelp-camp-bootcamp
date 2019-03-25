const
    mongoose = require("mongoose"),
    Post = require("./models/post"),
    User = require("./models/user");

mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

// Post.create({
//     title: "How to cook the best burger pt. 4",
//     content: "ASDFASF SAFSADF ASDF ASDF ASDF ASDF "
// }, (err,post) => {
//     User.findOne({email: "bob@gmail.com"},(err, foundUser) => {
//         if (err) {
//             console.log(err);
//         } else {
//           foundUser.posts.push(post);
//           foundUser.save((err, data) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//           });
//         }
//     });
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if (err) {
        console.log(err);    
    } else {
        console.log(user)
    }
    
});