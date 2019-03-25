const express       = require("express"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      Campground    = require("./models/campground"),
      seedDB        = require("./seeds"),
      ip            = process.env.IP,
      port          = process.env.PORT,
      app           = express()
 
//seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

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
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
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