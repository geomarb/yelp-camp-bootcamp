var express = require("express");
var app = express();

app.get("/", function(req, res) {
   res.send("Welcome to the home page!"); 
});

app.get("/speak/:animal",function(req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woff",
        cat: "Meow"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " +animal + " says \"" + sound + "\"");
    
});

app.get("/repeat/:message/:times",function(req, res) {
    var word = req.params.message;
    var num = Number(req.params.times);
    var result = "";
    for (i = 0; i < num; i++) {
        result += word + " ";
    }
    res.send(result);
    
});


//all routes
app.get("*", function(req, res) {
    res.send("Page not found!");
});

//server start
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});