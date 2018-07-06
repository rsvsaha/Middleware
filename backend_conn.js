const express = require('express');
const app = express();
const request = require('request');

//Importing the backend function
const router = require('./DEREK_router');


//Function to be called by Middleware main
exports.bkconn = function(json_param, callback) {

	//Query for DeviceID
	var devqr = {"Accessories" : json_param.parameters.Accessories, "DeviceType" : json_param.parameters.DeviceType, "OS" : json_param.parameters.OS, "OSVersion" : json_param.parameters.OSVersion, "Maker" : json_param.parameters.maker, "Model" : json_parameters.Model, "RAM" : json_param.parameters.ram, "Storage" : json_param.parameters.storage};
	
	request({
		url:"http://localhost:3000/query/device/",
		method:"POST",
		headers:{
			"content-type":"application/json",
			"Authorization" : "Bearer " + json_param.token
		},
		json:true,
		body:devqr,
		}, function(error, response, body) {
			var DeviceID = body.DeviceID;
		}
	)

	//Uses the device id obtained from above request
	var unitqr = {"DeviceID" : DeviceID, "EmployeeRegistrationID" : "none", "UnitCondition" : "healthy"};
	
	request({
		url:"http://localhost:3000/query/unit",
		method:"POST",
		headers:{
			"content-type":"application/json",
			"Authorization" : "Bearer " + json_param.token
		},
		json:true,
		body:unitqr,
		}, function(error, response, body) {
			var unitList = body;
		}
	)

	//Issue device
	if (json_param.issue == true) {
		
		var unitissue = {"UnitID" : unitList[0], "EmployeeRegistrationID" : json_param.parameters.EmployeeID};
		
		request({
			url:"http://localhost:3000/unit/issue",
			method:"POST",
			headers:{
				"content-type":"application/json",
				"Authorization" : "Bearer " + json_param.token
			},
			json:true,
			body:unitissue,
			}, function(error, response, body) {
				
			}
		)

		result = unitList[0];
		callback(result);
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
};
