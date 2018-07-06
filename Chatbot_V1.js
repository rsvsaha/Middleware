const apiai=require('apiai');
const app=apiai("a005521e4a574ad59ab090190ab7a5d8"); //Put the required access token for the bot
const bkconn=require('./backend_conn');	
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
		//console.log(response);
		var Result=response.result;
		//console.log(Result.actionIncomplete);
			
			if(Result.metadata.intentName=='DeviceQuery')
			{
						if(Result.actionIncomplete==false)

					{
						//console.log("HERE IN THE CONDTION");
						
						var requsest_to_backend={
							'issue':false,
							'parameters':Result.parameters

						};
						//Call Ritam's function and set the reply manually if it false else give the reply generated by Dialogflow
						bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){


								
								reply={"answer":Result.fulfillment.speech};
								callback(reply);
							}

							else{
								reply={"answer":"Sorry this device is not available."};
								callback(reply);	
							}
						
							
						});
						

					}
					else
					{
						reply={"answer":Result.fulfillment.speech};
						//console.log(reply);
						callback(reply);
						
					}


			}
			else if(Result.metadata.intentName=='DeviceStartContext')
			{




						if(Result.actionIncomplete==false)

					{
						//console.log("HERE IN THE CONDTION");
						var requsest_to_backend={
							'issue':false,
							'parameters':Result.parameters

						};
						//Call Ritam's function and set the reply manually if it false else give the reply generated by Dialogflow
						bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){
								reply={"answer":Result.fulfillment.speech};
								callback(reply);
							}
							else{

								reply={"answer":"Sorry this device is not available."};
								callback(reply);	
							}
						
							
						});
					}
					else
					{

						reply={"answer":Result.fulfillment.speech};
						//console.log(reply);
						callback(reply);
						
					}
			}
			else if(Result.metadata.intentName=='DeviceQuery-yes')

			{		


				//console.log(Result.contexts[0][0]);
				var requsest_to_backend={"issue":true,
				"parameters":null
			};
				//Accessories:Result.contexts[0].parameters.Accessories[],
				
				var requsest_to_backend={
					"issue":true,
					parameters:
					{Accessories:Result.contexts[0].parameters.Accessories, 
     				DeviceType:Result.contexts[0].parameters.DeviceType,
				     OS:Result.contexts[0].parameters.OS,
				     OSVersion:Result.contexts[0].parameters.OSVersion,
				     Maker:Result.contexts[0].parameters.Maker,
				     Model:Result.contexts[0].parameters.Model,
				     RAM:Result.contexts[0].parameters.RAM}
				 };
				 

				 bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){
								reply={"answer":Result.fulfillment.speech};
								//app.deleteContextsRequest(options);
								callback(reply);
							}
							else{

								reply={"answer":"Sorry this device just went out of stock."};
								//app.deleteContextsRequest(options);
								callback(reply);	
							}

					

					//TO INSERT WAY TO RESET CONTEXT



					});
			
			}
			
			else if(Result.metadata.intentName=='DeviceStartContext-yes')
			{
				//console.log(Result.contexts[0][0]);

				var requsest_to_backend={"issue":true,
				"parameters":null
			};
				//Accessories:Result.contexts[0].parameters.Accessories[],
				
				var requsest_to_backend={
					"issue":true,
					parameters:
					{ 
     				Accessories:Result.contexts[0].parameters.Accessories,
     				DeviceType:Result.contexts[0].parameters.DeviceType,
				     OS:Result.contexts[0].parameters.OS,
				     OSVersion:Result.contexts[0].parameters.OSVersion,
				     Maker:Result.contexts[0].parameters.Maker,
				     Model:Result.contexts[0].parameters.Model,
				     RAM:Result.contexts[0].parameters.RAM}
				 };
				 

				 bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){
								reply={"answer":Result.fulfillment.speech};
								//app.deleteContextsRequest(options);
								callback(reply);		
							}
							else{

								reply={"answer":"Sorry this device just went out of stock."};
								//app.deleteContextsRequest(options);
								callback(reply);	
							}
						

							//INSERT WAY TO RESET CONTEXT

				});
		
			}
			












			else{

				reply={"answer":Result.fulfillment.speech};
				callback(reply);


			}						

		
		});
		request.on('error',function(error){

		console.log(error);
		reply={"answer":"Sorry an error occured!!!"};

		callback(reply);
		});

		request.end();

		process.on('uncaughtExceptions',function(){
			console.log('Error');
		});
		
		

};












