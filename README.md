# Middleware

The SERVER1.js is the server which must be started before the entire process begins.
It has two routes one for chat and another for login at /chat and /login respectively.
The login route takes a JSON based request in the format.
  { 
    "userId":"your_user_Id",
    "password":"your_password"
  }
  it returns a json on successful login with a token.
  {"token":token}
  else it returns an error message with the respective error code.
  
  The chat route takes a JSON body in the format.
  {"token":your_valid_token,
  "userId":your_user_Id,
  "query":your_query_to_the_bot}.
  
  on successful query it returns a JSON reply with the field.
  {"answer":reply_from_chatbot}
  
  
  
  
  
