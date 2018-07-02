const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

bkconn.exports = function(json_param) {

	if (json_param.issue == true) {
	
		app.post('/unit/issue', (req, res) => {
			//Query for issuing
		});
	}
	
	else {
	
		app.post('/query/device', (req, res) => {
			//Query for availability
		});
	}
}