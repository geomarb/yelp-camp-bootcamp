var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;

// Campground.create(
//         {
//             name: "Cranite Hill",
//             image:"https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//             description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//         }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("New Campground: ");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//         {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
//         {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
//         {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
//         {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
//         {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
//         {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
//         {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
//         {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
//         {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
//         {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
//         {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
//         {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"}
//     ]