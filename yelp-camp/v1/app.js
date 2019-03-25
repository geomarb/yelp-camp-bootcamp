const express = require("express");
const bodyParser = require("body-parser");

const ip = process.env.IP;
const port = process.env.PORT;

const app = express();

var campgrounds = [
        {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
        {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
        {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"},
        {name: "Pracinha dos patos", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Caverá", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name: "Parque dos aguateiros", image:"https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name: "Parque do bah", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f2c17fa6e9bcbb_340.jpg"}
    ]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",(req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
        res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    //get data from from and add to campgrounds
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    
    campgrounds.push(newCampground);
    //redirect back to campgrounds pags
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new",(req, res) => {
    res.render("new");
});

app.get("*",(req, res) => {
    res.send("page not found");
});


app.listen(port, ip, () => {
    console.log(`YelpCamp server running at ${ip}:${port}`);
});