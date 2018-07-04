//Importing the backend function
const backindex = require(./index);

//Function to be called by Middleware main
exports.bkconn = function(json_param, function(err, result) {
	
	if(!err) {
		if (json_param.issue == true) {
			//Issue device
		
			var devqr = {"RAM" : json_param.parameters.ram, "Storage" : json_param.parameters.storage};
			var dev_details = backindex.query_device(devqr);
		
			//Uses the device id obtained from above function call
			var unitqr = {"DeviceID" : dev_details.DeviceID, "OS" : json_param.parameters.os, "EmployeeRegistrationID" : "none"};
			var unit_details = backindex.issue_unit(unitqr);
			
			result = unit_details.unitID;
			callback(result);
		}
	
		else {
			//Query for available devices
			var devqr = {"RAM" : json_param.parameters.ram, "Storage" : json_param.parameters.storage};
			var dev_details = backindex.query_device(devqr);

			//Uses the device id obtained from above function call
			var unitqr = {"DeviceID" : dev_details.DeviceID, "OS" : json_param.parameters.os, "EmployeeRegistrationID" : "none"};
			var unit_details = backindex.query_unit(unitqr);
		
			result = unit_details.NoOfAvailable;
			callback(result);
		}
	}
});
