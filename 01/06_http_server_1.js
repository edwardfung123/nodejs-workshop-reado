// nodejs comes with http module
// see https://nodejs.org/docs/v0.10.35/api/http.html
var http = require('http');

// To create an HTTP server is easy.
// The callback is called when some clients connected to the server
// using HTTP protocol.
var server =http.createServer(function(req, res){
  // `req` is the request. The client sends this request to the server.
  // It contains the query string and request body which the client
  // uses them to send data to the server.

  // `res` is the response object. use this to write send data back to the
  // client (browser, android, ios and ...)

  console.log('Yeah someone connected to our server');
});

// the server is not listening to the request yet.
server.listen(3000, function(){
  console.log('The server is now listening on 3000 port');
});

// Let's connect the server with curl
//
// curl http://localhost:3000
//
// But the program hangs up right? why?
// (hint in the callback function of the server.)
