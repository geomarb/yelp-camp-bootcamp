var express = require("express");
var app = express();

// "/" ==> "Hi there!"
app.get("/", function(req, res) {
    res.send("Hi there!");
});

// "/bye"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

// "/dog"
app.get("/dog", function(req, res) {
    res.send("MEOW!");
});

app.get("*", function(req, res) {
    res.send("YOU ARE A STAR!");
});

// Tell Express to listen for requests (start server)
var port = process.env.PORT;
var ip = process.env.IP;

app.listen(port, ip, function() {
    console.log("Server has started!!!");
});