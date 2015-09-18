// nodejs comes with http module
// see https://nodejs.org/docs/v0.10.35/api/http.html
var http = require('http');

// I love using the underscore library.
var _ = require('underscore');

// Define a set of api regexs.
var _apiRegex = /^\/api\/[a-zA-Z0-9_\-\/]+$/;
var _apiTeamsRegex = /^\/api\/teams\/?$/;

// Define the data as we dont have a database. You can skip this part.
var edward = {
  id: 'edward',
  name: 'Edward Fung',
  position: 'Rubbish',
};

var paulo = {
  id: 'paulo',
  name: 'Paulo Lam',
  position: 'CTO',
};

var teams = [
  {
    id: 'backend',
    name: 'Backend Team',
    members: [edward, ],
  },

  {
    id: 'mobile',
    name: 'Mobile Team',
    members: [paulo, ],
  },

  {
    id: 'design',
    name: 'Design Team',
    members: [],
  },

  {
    id: 'sales-and-marketing',
    name: 'Sales & Marketing Team',
    members: [],
  }
];

// Let's create an API server
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
  if (!_apiRegex.test(urlObj.pathname)){
    res.statusCode = 404;
    res.end('page not found');
    return;
  }

  var contentType = 'application/json';
  var data = null;

  var isFound = false;
  // Prepare an API for getting all the teams.
  // Each API should update `isFound` and `data`.
  if (_apiTeamsRegex.test(urlObj.pathname)){
    isFound = true;
    data = _.map(teams, function(t){
      return _.pick(t, 'id', 'name');
    });
  }
  /***************************************************/
  // Add your new API here.

  // Task 1
  // =====
  // Your task is to create an API for listing all the members in the team.
  // (e.g. /api/teams/backend)

  // Task 2
  // ======
  // Your second task is to create an API to update the position of a member if
  // it is a POST request to /api/[TEAM_ID]/[MEMBER_ID] (e.g. POST
  // /api/teams/backend/edward).
  // 
  // The POST body is encoded using "application/x-www-form-urlencoded". (e.g.
  // name=Edward+Fung&position=Real+Rubbish)

  // This should be the end of the API handling code.
  /***************************************************/

  // Tell the user the API does not exist.
  if (!isFound){
    res.statusCode = 404;
    res.end('no such api');
    return;
  }

  // The normal case.
  res.setHeader('content-type', contentType);
  res.write(JSON.stringify(data));
  res.end();
});

// the server is not listening to the request yet.
server.listen(3001, function(){
  console.log('The server is now listening on 3001 port');
});

//-----
// The problem of this server is:
// - Adding handlers are painful (not easy to modularize)
