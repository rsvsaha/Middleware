module.exports.chat = function(req,callback){

 var data = req.body;
 var result=  data.query;
 var token = data.token;	
 var userID = data.userId;
 callback(result, token,userID);
}

module.exports.logger = function(req,callback){

 var data = req.body;
 var user=  data.userId;
 var password = data.password;	
 callback(user, password);
}



