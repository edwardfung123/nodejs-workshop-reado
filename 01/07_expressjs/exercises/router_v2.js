var express = require('express');
var router = express.Router();
var _ = require('underscore');

// Things we learnt from exercise 1.
// - some functions like get_by_id is called quite often.
// - better abstract the DB implementation from the API layer. The API layer
//   should not care about how those models' CRUD action are implemented.

// Create an in memory users db (o:
var User = require('../models/user_sql.js');
router.post('/users', function(req, res, next) {
  // DEMO!
  // TODO: create a new user in the DB.
  var user = req.body;
  console.log('user from body');
  console.log(user);

  // TODO: check if the user is registered
  User.get_by_id(user.id, function(err, user){
    if (user){
      // User found
      res.status(400).json({message: 'already registered'});
      return;
    }

    if (err.code == User.ERRORS.USER_NOT_FOUND){
      // So we can save it
      var newUser = new User(req.body);
      newUser.save(function(err){
        // TODO: handle error
        res.json(newUser.toJSON());
      });
      return;
    }

  });
});

router.get('/users', function(req, res, next){
  // TODO: return the list of users.
  // params: 
  //   offset: integer, number of skipped users.
  //   hits: integer, number of users
  res.end();        // delete me
});

router.get('/users/:id', function(req, res, next){
  // TODO: return the user specified by `id`
  res.end();
});

//-----
// define the Post related API
var Post = require('../models/post_sql.js');

router.post('/posts', function(req, res, next) {
  // TODO: create a new posts in the DB.
  // Add your code here
  res.end();      // delete me (o:
});

router.get('/posts', function(req, res, next){
  // TODO: return the list of posts of a user.
  var userid = req.query.userid;
  if (!userid){
    res.status(400).json({message: 'Missing userid'});
    return;
  }
  // add your code here
  res.end();      // delete me (o:
});

router.get('/posts/:id', function(req, res, next){
  // TODO: return the post specified by `id`
  var pid = req.params.id;
  if (!pid){
    res.status(400).json({'message': 'no post id specified.'});
    return;
  }
  // add your code here.
  res.end();      // delete me (o:
});

module.exports = router;
