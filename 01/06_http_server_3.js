// nodejs comes with http module
// see https://nodejs.org/docs/v0.10.35/api/http.html
var http = require('http');

// Let's create a more "useful" webserver
var server =http.createServer(function(req, res){
  console.log('Yeah someone connected to our server');

  // Check the path of the request
  // The path is stored in the `req.url`. To parse it, we use the url module (o:
  var url = require('url');

  // `url.parse` takes two arguments:
  // - url: string, the url to be parsed (e.g. /abc.html?q=123)
  // - parseQueryStrung: boolean, whether the query string is parsed.
  var urlObj = url.parse(req.url, true);

  console.log(urlObj);

  //```
  // /a/b/c?q=123&t=20150917 -->
  // { 
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: '?q=123&t=20150917',
  //   query: { q: '123', t: '20150917' },
  //   pathname: '/a/b/c',
  //   path: '/a/b/c?q=123&t=20150917',
  //   href: '/a/b/c?q=123&t=20150917' }
  //```



  // Now read the file requested.
  var fs = require('fs');
  var path = require('path');

  var contentType = 'text/plain';
  var readOptions = {
    encoding: 'utf-8',
  };
  // You better set the content type and read the file as binary
  //```
  //if (/\.jpg|jpeg$/i.test(urlObj.pathname)){
  //  contentType = 'image/jpeg';
  //  readOptions = {};
  //} else if (/\.png$/i.test(urlObj.pathname)){
  //  contentType = 'image/png';
  //  readOptions = {};
  //} else if (/\.html/i.test(urlObj.pathname)){
  //  contentType = 'text/html';
  //}
  //```
  fs.readFile(path.normalize('assets' + urlObj.pathname), readOptions, function(err, data){
    // Should check the err anyway.
    if (err){
      res.statusCode = 404;
      res.write('Page not found');
      res.end();
      return;
    }

    // The file exists.
    res.setHeader('content-type', contentType);
    res.write(data);
    res.end();
  });
});

// the server is not listening to the request yet.
server.listen(3001, function(){
  console.log('The server is now listening on 3001 port');
});

// try visit:
// - http://localhost:3001/test.html  (should return 200)
// - http://localhost:3001/a/b.html   (should return 404)
// - http://localhost:3001/nodejs.jpg (what is it?)


//-----
// The problem of this server is:
// - Adding handlers are painful (not easy to modularize)
// - Not using the http caching mechanisim.
// - Super painful to handle MIME type (content-type)
// - The response are not compressed. (gzip)
