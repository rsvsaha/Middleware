var cor=require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var fs = require('fs');
var comm = require('./common.js');
var chatbot = require('./Chatbot_V1.js');
var gen = require('./Authenticator.js');
var back = require('./backend_conn.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cor());

var hostname = '127.0.0.1';
var port = 2000;

app.post('/HELLO', function(req,res){
		console.log("request obtained");
		console.log(req.body);
		res.send({"token":'12920'});
	});


/*
app.get('/', function (req, res) {
    fs.readFile("front.html",function(err, data) {
      if(err)
        {res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");}
      else
      {
        res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      }
      // body
    })  

});
*/
app.post('/login_auth', function(req, res) {
		console.log("POST request obtained at /login_auth");
		console.log(req.body);

		comm.logger(req, function(user, password){

			var json_param = {
					   'username' : user,
					   'password' : password
					 };

			back.bklogin(json_param, function(json_return) {
				if(json_return.statusCode == 200)
					res.json({"token": json_return.body});
				else
					res.status(200).send('Sorry');
			});
		});
				
	});


app.post('/chat', function(req, res){
	console.log("POST request obtained at /chat");
	console.log(req.method);
	console.log(req.body);

	comm.chat(req, function(result, token, user) {
		gen.verifyToken(token, function(response) {
			if(response)
			{chatbot(token, user, result, function(reply) {
				res.send(reply);
		});}
	});


	});

});


var server=app.listen(port, hostname, function() {
	//var host = server.address().address;
	//var port = server.address().port
	console.log('Example app listening at http://%s:%s', hostname, port);
	});
