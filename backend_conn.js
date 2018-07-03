//Importing the backend function
const backindex = require(./index);

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

bkconn.exports = function(json_param) {

	if (json_param.issue == true) {
		var devissue = {};
		
		
	}
	
	else {
		//Query for available devices
		var devqr = {"device_name" : json_param.device_name, "ram" : json_param.ram, "storage" : json_param.storage};
		var dev_details = index.query_device(devqr);
		var unitqr = {"device_id" : dev_details.device_id, "os" : json_param.os, "os_version" : json_param.os_version, "employeeregistrationid" : "none"};
		var unit_details = index.query_unit(unitqr);
		return noofavailable;
	}
}
