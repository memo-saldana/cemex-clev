var express = require("express");

var app = express();

var request = require('request');
app.set("view engine","ejs");

app.get('/home', (req,res) => {
    res.render("index");
});



app.listen(8000, function() {
	console.log("CLEV on port 8000");
});

