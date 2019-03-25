const   bodyParser      = require("body-parser"),
        methodOverride  = require('method-override'),
        expressSanitizer  = require('express-sanitizer'),
        express         = require("express"),
        mongoose        = require("mongoose"),

        app             = express(),
        
        ip              = process.env.IP,
        port            = process.env.PORT;

//APP CONFIG
mongoose.connect("mongodb://localhost/restfull_blog_app", { useNewUrlParser: true } );
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //must be after bodyParser
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://placeimg.com/640/480/any"},
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({},(err, blogs) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new", (req, res) => {
    Blog.find({},(err, blogs) => {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.render("new");
        }
    });
});

//CREATE ROUTE
app.post("/blogs", (req,res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, (err, blog) => {
        if (err) {
            res.render("new");
        } else {
            //then, redirect
            res.redirect("/blogs");
        }
    })
});

//SHOW ROUTE
app.get("/blogs/:id",(req, res) => {
    Blog.findById(req.params.id,(err,foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show",{blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit",(req, res) => {
    Blog.findById(req.params.id,(err,foundBlog) => {
        if (err) {
          console.log("ERROR DELETING: " + err);
          res.redirect("/blogs");
        } else {
            res.render("edit",{blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", (req,res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,updatedBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
           res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", (req,res) => {
     Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(port, ip, () => {
    console.log(`Restfull Blog server up and running at ${ip}:${port}`);
});
