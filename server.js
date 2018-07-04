const express = require ("express");
const app= express();
const port = process.env.PORT || 3000;
var server = app.listen(port, ()=>{
	var host = server.address().address
	var port = server.address().port
	console.log("App listeing at http://%s:%s", host,port)
});
var myParser = require('./parser.js');
app.use(myParser.json());
app.post('',(req,res)=>{
	if(req.body=={})
		res.send("sorry");
	else
	{
		const data = req.body;
	console.log(data);
	
	//code for function call for dialogflow agent
	const response = {
		text: "The code is working fine"
	}
	res.json(response);


	}
	
});
