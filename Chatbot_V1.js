
 //Put the required access token for the bot
const bkconn=require('./backend_conn');	
module.exports = function (token,user_Id,query,callback) { 
	var apiai=require('apiai');    
	var sesId=user_Id+token.substring(1,12);

    var options={
		sessionId:sesId
	};
	var reply;
		//console.log(2);
		var app=apiai("a005521e4a574ad59ab090190ab7a5d8");
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
				     RAM:Result.contexts[0].parameters.RAM},
				     "token":token
				 };
				 

				 bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){
								reply={"answer":Result.fulfillment.speech};
								var delete_ContextsRequest=app.deleteContextsRequest(options);
								delete_ContextsRequest.on('response',function(response){
								callback(reply);	
								});
								delete_ContextsRequest.on('error',function(error){
								console.log(error);
								callbak(reply);	
								});
								delete_ContextsRequest.end();
							}
							else{

								reply={"answer":"Sorry this device just went out of stock."};
								//app.deleteContextsRequest(options);
								var delete_ContextsRequest=app.deleteContextsRequest(options);
								delete_ContextsRequest.on('response',function(response){
								callback(reply);	
								});
								delete_ContextsRequest.on('error',function(error){
								console.log(error);
								callbak(reply);	
								});
								delete_ContextsRequest.end();
							
							}

					

					//TO INSERT WAY TO RESET CONTEXT



					});
			
			}
			
			else if(Result.metadata.intentName=='DeviceStartContext-yes')
			{
				//console.log(Result.contexts[0][0]);
				/*
				var requsest_to_backend={"issue":true,
				"parameters":null
			};*/
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
				     RAM:Result.contexts[0].parameters.RAM},
				 	"token":token
				 }

				 ;
				 

				 bkconn.bkconn(requsest_to_backend,function(result){
							if(result==true){
								reply={"answer":Result.fulfillment.speech};
								var delete_ContextsRequest=app.deleteContextsRequest(options);
								delete_ContextsRequest.on('response',function(response){
								callback(reply);	
								});
								delete_ContextsRequest.on('error',function(error){
								console.log(error);
								callbak(reply);	
								});
								delete_ContextsRequest.end();
							}
							else{

								reply={"answer":"Sorry this device just went out of stock."};
								//app.deleteContextsRequest(options);
								var delete_ContextsRequest=app.deleteContextsRequest(options);
								delete_ContextsRequest.on('response',function(response){
								callback(reply);	
								});	
								delete_ContextsRequest.on('error',function(error){
								console.log(error);
								callbak(reply);	
								});
								delete_ContextsRequest.end();
								}
											

							//INSERT WAY TO RESET CONTEXT

				});
		
			}
			
			else if(Result.metadata.intentName=='DeviceQuery-no')
			{

				reply={"answer":Result.fulfillment.speech};
				var delete_ContextsRequest=app.deleteContextsRequest(options);
				delete_ContextsRequest.on('response',function(){
				callback(reply);	
				});
				delete_ContextsRequest.on('error',function(error){
				console.log(error);
				callbak(reply);	
				});
				delete_ContextsRequest.end();


			}
			else if(Result.metadata.intentName=='DeviceStartContext-no')
			{
				reply={"answer":Result.fulfillment.speech};
				var delete_ContextsRequest=app.deleteContextsRequest(options);
				delete_ContextsRequest.on('response',function(response){
				callback(reply);	
				});

				delete_ContextsRequest.on('error',function(error){
				console.log(error);
				callbak(reply);	
				});
				delete_ContextsRequest.end();



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

		//request.setMaxListeners(100);

		process.on('uncaughtExceptions',function(){
			console.log('Error');
		});
		
		

};












