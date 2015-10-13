var request = require('request');

var url = 'http://localhost:3000/api/ansv2/posts';

var data = {
  message: 'foo bar',
  userid: 2,
};

request.post(url, {form: data}, function(err, res, body){
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
