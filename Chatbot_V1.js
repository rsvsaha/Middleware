
const apiai=require('apiai');
const app=apiai("a005521e4a574ad59ab090190ab7a5d8"); //Put the required access token for the bot
const back_end_conn=require('bkconn');
module.exports = function (sesId,query,callback) { 
var options={
		sessionId:sesId
	};
	var reply;
		//console.log(2);
		
		var request = app.textRequest(query, options);
		request.on('response',function(response){
		//console.log(3);
		//console.log(response.result.fulfillment.speech);
		var Result=response.result;
		console.log(response);
		//console.log(Result.actionIncomplete);
			if(Result.actionIncomplete==false)

			{
				//console.log("HERE IN THE CONDTION");

				back_end_conn(json_param,Result.parameters,function(availability){
					if(availability)
					{reply={"answer":Result.fulfillment.speech};}
					else
					{
						reply={"answer":"Sorry the device with the required specifications is not available"};
					}

				})

				


			
			}
			else
			{

				reply={"answer":Result.fulfillment.speech};
				//console.log(reply);

				
			}
			callback(reply);
		
		});
		request.on('error',function(error){

		console.log(error);
		reply={"answer":"Sorry an error occured!!!"};
		callback(reply);
		});

		request.end();

		//console.log(4);
				
		

};












