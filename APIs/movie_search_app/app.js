const express = require('express');
const request = require('request');


const port = process.env.PORT;
const ip = process.env.IP;

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", function(req, res) {
    const query = req.query.search;
    const url = 'http://www.omdbapi.com/?s='+query+'&apikey=thewdb';
    
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("result", {data: data});
        }
    });
});


app.listen(port, ip, function() {
  console.log(`Movie search app running at ${ip}:${port}`);
});