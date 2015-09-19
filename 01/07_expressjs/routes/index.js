var express = require('express');
var router = express.Router();

// Note that the path here is relative to the 'mount point' of this router.
// For example, if the mount point is /users/, then router.get('/a/b/c') is
// actually handling the request sent to /users/a/b/c.

/* GET home page. */
// If the request path is '/' and the METHOD is GET, handle it.
router.get('/', function(req, res, next) {
  // render() -> call the template engine to render the template called 'index'
  // and use {title: 'Express'} as the data when rendering the template.
  res.render('index', { title: 'Express' });
});

module.exports = router;
