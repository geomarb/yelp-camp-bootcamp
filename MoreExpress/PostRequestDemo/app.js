var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var friends = ["Norton","Newton","Rodrigo","Souto","Paula"];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req, res){
    res.render("home");
});

app.post("/addfriend",function(req, res) {
    var newFriend = req.body.name;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends",function(req, res) {
    res.render("friends",{friends: friends});
});

app.get("*",function(req, res){
    res.render("not-found");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("NODE JS Server running!");
});