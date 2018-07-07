//Configuration
const express = require('express');
const app = express();
const request = require('request');


//Importing the backend function
const router = require('./DEREQ_router');
app.use('/', router);


//Function to be called by Middleware main for query and issue of devices
exports.bkconn = function(json_param, callback) {
	
	var DeviceID;
	var unitList;
	var result;

	//Parameters for /query/device
	var devqr = {"Accessories" : json_param.parameters.Accessories, "DeviceType" : json_param.parameters.DeviceType, "OS" : json_param.parameters.OS, "OSVersion" : json_param.parameters.OSVersion, "Make" : json_param.parameters.Make, "Model" : json_param.parameters.Model, "RAM" : json_param.parameters.RAM, "Storage" : json_param.parameters.Storage};
	
	//First function for /query/device
	var first = function(devqr) {

		//Query for available devices and retrieving DeviceID
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
		
			if(request.body.result === "RESULT_OK") {
				DeviceID = request.body.message.DeviceID;
		
				//Parameters for /query/unit 
				var unitqr = {"DeviceID" : DeviceID, "EmployeeRegistrationID" : "none", "UnitCondition" : "healthy"};
				
				//Calling the second function
				second(unitqr);
			}

			else {
				callback(false);
			}
		}
		);
	}

	//Second function for /query/unit
	var second = function(unitqr) {

		//Query for available units
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
			
			if(request.body.result === "RESULT_OK") {

				//Parameters for third function
				unitList = request.body.message;
				unitRes = request.body;

				//Calling the third function
				third(unitList, unitRes);
			}
			
			else {
				callback(false);
			}
		}
		);
	}

	//Third function for /unit/issue
	var third = function(unitList, unitRes) {

		//Issue device
		if (json_param.issue == true) {
			
			//Parameters for issuing unit
			var unitissue = {"UnitID" : unitList[0].UnitID, "EmployeeRegistrationID" : json_param.EmployeeID};

			//Query for issuing unit		
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

				if(request.body.result === "RESULT_OK") {
					
					//Return UnitID
					var json_return = {"is_available" : true, "UnitID" : unitissue.UnitID};
					callback(json_return);
				}
				else {
					callback(false);
				}
			}
			);
		}

		//Check for available devices
		else {

			if(unitRes.result == "RESULT_OK") {
				
				var json_return = {"is_available" : true, "UnitID" : null};
				callback(json_return);
			}

			else {
				callback(false);
			}
		}
	}

	//Calling the first function
	first(devqr)
}


//Function to be called by Middleware main for login and receiving tokens
exports.bklogin = function(json_param, callback) {

	//Parameters for login
	var login = {"EmployeeID" : json_param.username, "Password" : json_param.password};
	
	//Request for login
	request({
		url:"http://localhost:2000/login",
		method:"POST",
		headers:{
			"content-type":"application/json",
		},
		json:true,
		body:login,
	},

	function(error, request, response) {
	
		//If <success>
		if(request.statusCode == 200) {
			var json_return = {"is_available" : true, "statusCode" : request.statusCode, "body" : request.body.token};
			callback(json_return);	
		}
	
		//If <failure>
		else {
			var json_return = {"is_available" : false, "statusCode" : request.statusCode, "body" : request.body};
			callback(json_return);
		}
	}
	);
}


/*
THIS CODE WAS ONLY FOR TESTING PURPOSES

var server = app.listen(2000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
*/


