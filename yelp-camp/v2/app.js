const express     = require("express"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      ip          = process.env.IP,
      port        = process.env.PORT,
      app         = express()

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

// Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

app.get("/",(req, res) => {
    res.render("landing");
});

// RESTFUL ROUTE: INDEX - Display all list
app.get("/campgrounds", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({},(err, campgrounds) => {
        if (err){
            console.log(err);
        } else {
         res.render("index",{campgrounds: campgrounds});
        }
    });
});

// RESTFUL ROUTE: CREATE - Add new record
app.post("/campgrounds", (req, res) => {
    //get data from from and add to campgrounds
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {name: name, image: image, description: description};
    
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log("New Campground: ");
            console.log(campground);
            //redirect back to campgrounds pags
            res.redirect("/campgrounds");
         }
    });
});

// RESTFUL ROUTE: NEW - Displays form to add new item (*must be before the SHOW route)
app.get("/campgrounds/new",(req, res) => {
    res.render("new");
});

// RESTFUL ROUTE: SHOW - shows info/detail about an item
app.get("/campgrounds/:id", (req, res) => {
    console.log("ENTROU NO ID");
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show",{campground: foundCampground});
        }
    });
});

app.get("*",(req, res) => {
    res.send("page not found");
});
app.listen(port, ip, () => {
    console.log(`YelpCamp server running at ${ip}:${port}`);
});