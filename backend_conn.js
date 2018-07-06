//Importing the backend function
//const backindex = require(./index);

//Function to be called by Middleware main
exports.bkconn = function(json_param, callback) {
	
	console.log(json_param);

	if (json_param.issue == true) {
		//Issue device

		/*var devqr = {"RAM" : json_param.parameters.ram, "Storage" : json_param.parameters.storage, "OS" : json_param.parameters.os};
		var dev_details = backindex.queryDB(devqr);
		
		//Uses the device id obtained from above function call
		var unitqr = {"DeviceID" : dev_details.DeviceID, "EmployeeRegistrationID" : "none", "UnitCondition" : "healthy"};
		var unit_details = backindex.query_unit(unitqr);
		
		var unitissue = {"UnitID" : unit_details[0], "EmployeeRegistrationID" : json_param.parameters.EmployeeID};
		backindex.issueUnit(unitissue);	
		result = "Issued Device Unit ID: " + unit_details[0];*/
		callback("Device is issued with \n" + json_param);
	}
	
	else {
		//Query for available devices
		
		/*var devqr = {"RAM" : json_param.parameters.ram, "Storage" : json_param.parameters.storage, "OS" : json_param.parameters.os};
		var dev_details = backindex.queryDB(devqr);

		//Uses the device id obtained from above function call
		var unitqr = {"DeviceID" : dev_details.DeviceID, "EmployeeRegistrationID" : "none", "UnitCondition" : "healthy"};
		var unit_details = backindex.query_unit(unitqr);
		
		if(unit_details.length > 0) {
			callback(true);
		}

		else if(unit_details.length == 0) {
			callback(false);
		}*/
		callback("Device is checked for availability with \n" + json_param);

	}	
};
