const express = require('express');
const app = express();
const request = require('request');

//Importing the backend function
const router = require('./DEREQ_router');
app.use('/', router);


//Function to be called by Middleware main
exports.bkconn = function(json_param, callback) {
	
	var DeviceID;
	var unitList;
	var result;

	//Query for DeviceID
	var devqr = {"Accessories" : json_param.parameters.Accessories, "DeviceType" : json_param.parameters.DeviceType, "OS" : json_param.parameters.OS, "OSVersion" : json_param.parameters.OSVersion, "Make" : json_param.parameters.Make, "Model" : json_param.parameters.Model, "RAM" : json_param.parameters.RAM, "Storage" : json_param.parameters.Storage};
	
	var first = function(devqr) {
		request({
			url:"http://localhost:2000/query/device/",
			method:"POST",
			headers:{
				"content-type" : "application/json",
				"Authorization" : "Bearer " + json_param.token
			},
			json : true,
			body : devqr
		}, 

		function(error, request, response) {
			console.log(request.body);
			DeviceID = request.body.message.DeviceID;
			var unitqr = {"DeviceID" : DeviceID, "EmployeeRegistrationID" : "none", "UnitCondition" : "healthy"};
			second(unitqr);
		}
		);
	}

	var second = function(unitqr) {
		request({
			url:"http://localhost:2000/query/unit",
			method:"POST",
			headers:{
				"content-type":"application/json",
				"Authorization" : "Bearer " + json_param.token
			},
			json:true,
			body:unitqr,
		}, 
			
		function(error, request,  response) {
			console.log(request.body);
			unitList = request.body.message;
			console.log(unitList);
			third(unitList);
		}
		);
	}

	var third = function(unitList) {
		//Issue device
		if (json_param.issue == true) {
		
			var unitissue = {"UnitID" : unitList[0].UnitID, "EmployeeRegistrationID" : json_param.parameters.EmployeeID};
		
			request({
				url:"http://localhost:2000/unit/issue",
				method:"POST",
				headers:{
					"content-type":"application/json",
					"Authorization" : "Bearer " + json_param.token
				},
				json:true,
				body:unitissue,
			}, 
		
			function(error, request, response) {
				result = request.body.result;
				if(result === "RESULT_OK") {
					callback(true);
				}
				else {
					callback(false);
				}
			}
			);
		}

		//Query for available devices
		else {

			if(unitList.length > 0) {
				callback(true);
			}

			else if(unitList.length == 0) {
				callback(false);
			}
		}
	}
	first(devqr)
}

/*var server = app.listen(2000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})*/

