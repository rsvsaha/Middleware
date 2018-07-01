const express = require ("express");
const myParser = require("body-parser");
const app= express();
//const f = require("middle");
app.use(myParser.json());
app.post('',(req,res)=>{
	const data = req.body;
	console.log(data);
	//console.log(data.Query);
	//code for function call for dialogflow agent


	const response = {
		text: "The code is working fine"
	}
	res.json(response);

});


//app.listen(3000);
const port = process.env.PORT || 3000;
var server = app.listen(port, ()=>{
	var host = server.address().address
	var port = server.address().port
	console.log("App listeing at http://%s:%s", host,port)
})