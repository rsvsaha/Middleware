//Importing the backend function
const backindex = require(./index);

//Function to be called by Middleware main
exports.bkconn = function(json_param) {

	if (json_param.issue == true) {
		//Issue device
	}
	
	else {
		//Query for available devices
		var devqr = {"RAM" : json_param.ram, "Storage" : json_param.storage};
		var dev_details = backindex.query_device(devqr);

		//Uses the device id obtained from above function call
		var unitqr = {"DeviceID" : dev_details.DeviceID, "OS" : json_param.os, "EmployeeRegistrationID" : "none"};
		var unit_details = backindex.query_unit(unitqr);
		
		return unit_details.NoOfAvailable;
	}
}
