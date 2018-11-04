const express = require("express");
const bodyParser = require('body-parser');
//const parseXML = require('xml-parse-from-string');

var app = express();

var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.get('/home', (req,res) => {
    res.render("index");
});

app.post('/invoice/new', (req, res) => {

    var data;
    var xmlArray = [];

    request('http://localhost:1234/10000000/new/invoices', (error, response, body) => {        
        data = JSON.parse(body);
        // console.log(data);
        data.invoices.forEach(function(invoice) {
            xmlArray.push(invoice);
        });
    
        console.log(xmlArray);
        res.render('invoice', {xmlArray:xmlArray});
    });
    
  
});

app.listen(8000, function() {
	console.log("CLEV on port 8000");
});

