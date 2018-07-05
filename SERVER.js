
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var hostname = '127.0.0.1';
var port = 3000;

var username;
var pass;

app.get('/', function(req,res){
		console.log("GET request obtained");
		res.send("Hello");
	});

app.post('/login', function(req,res,next){
		console.log("POST request obtained at /login");
		username = req.body.username;
		pass = req.body.pass;
		//next();			
	});

app.post('/chat', function(req, res,next){
	console.log("POST request obtained at /chat");
	console.log(req.method);
	console.log(req.body);
	var question = req.body.query;
	
	////////////////////START REQUEST & RESPONSE TO DIALOGFLOW ///////////////////////////////
	next();
	res.send("BYE");
	
	});



var server=app.listen(port, hostname, function() {
	//var host = server.address().address;
	//var port = server.address().port
	console.log('Example app listening at http://%s:%s', hostname, port);
	});
 
