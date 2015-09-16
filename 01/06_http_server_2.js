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

  // `req` and `res` are "stream".
  //
  // unless you write or close the res stream, nothing will
  // be sent back to the client.

  // I don't care what you sent to me :o)
  res.write('I');
  res.write('Don\'t');
  res.end('care.');

  //----------------------------------------------------

  // Let's try returning a json. (comment the above lines first)

  // Hint the browser that the response is a json.
  // Note that header cant be set after res.write/end
  //```javascript
  //res.setHeader('content-type', 'application/json');
  //```

  // Now write the response.
  //```javascript
  //res.end('{"meta":{"code":200}}');
  //```

  // craft the json by ourselves is too painful.
  //```
  //res.end(JSON.stringify({
  //  meta: {
  //    code: 200,
  //  },
  //}));
  //```

  //-----------------------------------------------------

  // Maybe HTML file as well

  //```
  //var fs = require('fs');
  //fs.readFile('assets/test.html', {encoding:'utf-8'}, function(err, data){
  //  res.setHeader('content-type', 'text/html');
  //  res.write(data);
  //  res.end();
  //});
  //```
  
  //-----------------------------------------------------

  // Read an image and send it to the client using READ_STREAM.
  //```
  //res.setHeader('content-type', 'image/jpeg');
  //var fs = require('fs');
  //var fileStream = fs.createReadStream('./assets/nodejs.jpg');
  //fileStream.pipe(res);   // WTF is the this?
  //```
});

// the server is not listening to the request yet.
server.listen(3001, function(){
  console.log('The server is now listening on 3001 port');
});
