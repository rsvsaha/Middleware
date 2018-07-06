exports.bkconn = function(json_param, callback) {
	
	//console.log(json_param);

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
		console.log("device issued with "+json_param);
		callback(true);
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
		console.log("device searched with "+json_param);
		callback(true);
	}	
};