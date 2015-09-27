var request = require('request');

var url = 'http://localhost:3000/api/v1/users';

request.get(url, function(err, res, body){
  if (err){
    console.error(err);
    return;
  }
  if (res.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  } else {
    console.error(res.statusCode);
    console.error(body);
  }
});
