const express = require("express");
const bodyParser = require('body-parser');
//const parseXML = require('xml-parse-from-string');

var app = express();

var request = require('request');

function timestamp(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var min = today.getMinutes();
	var ss = today.getSeconds();
	if(dd<10){
		dd = '0'+dd
	}
	if(mm<10){
		mm = '0' +mm
	}
	if(hh<10){
		hh='0'+hh
	}
	if(min<10){
		min = '0'+min
	}
	if(ss<10){
		ss = '0'+ss
	}

	return yyyy+'/'+mm+'/'+dd+' '+hh+':'+min+':'+ss
}

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
var clientKey = "10000000"


app.get('/home', (req,res) => {
    res.render("index");
});

app.post('/invoice/new', (req, res) => {

    var data;
    var xmlArray = [];

    request('http://clev-cemex-api.firebaseapp.com/'+ clientKey +'/new/invoices', (error, response, body) => {        
        data = JSON.parse(body);
        // console.log(data);
        data.invoices.forEach(function(invoice) {
            xmlArray.push(invoice);
        });
    
        console.log(xmlArray);
        res.render('invoice', {xmlArray:xmlArray});
    });
});

app.post("/logs", (req,res) =>{
	const mylog = req.body.log;
	const mytime = timestamp();
	console.log(clientKey);
	console.log(mylog);
	console.log(mytime);
	const url = "http://clev-cemex-api.firebaseapp.com/" + clientKey + "/logs/"+mytime+"/"+mylog;
	request(url, (error,response,body)=>{
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.redirect("home");
			console.log("GOOD")
		}
		else {
			res.redirect("home");
			console.log("BAD")
		}
	});
	// var formData = {
	// 	clientKey: clientKey,
	// 	message: mylog,
	// 	timestamp: mytime
	// }
	// const url = "http://clev-cemex-api.firebaseapp.com/" + clientKey + "/logs";
	// request.post({url: url, formData: formData} , function(err,res,body){
	// 	if(err){
	// 		return console.error('Upload failed: ', err);
	// 	}
	// 	console.log('Upload successful! Server responded with: ', body, res.statusCode)
	// 	if(!err){
	// 		if(res.statusCode == 200){
	// 		} else {
	// 			res.redirect("ERROR stat code "+ res.statusCode);
	// 		}
	// 	} else{
	// 		console.log(err);
	// 		res.send("ERROR");
	// 	}
	// })
});

app.listen(8000, function() {
	console.log("CLEV on port 8000");
});

