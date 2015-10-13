var express = require('express');
var router = express.Router();
var _ = require('underscore');

// Things we learnt from exercise 1.
// - some functions like get_by_id is called quite often.
// - better abstract the DB implementation from the API layer. The API layer
//   should not care about how those models' CRUD action are implemented.

// Create an in memory users db (o:
var User = require('../models/user_sql.js');
var Post = require('../models/post_sql.js');

router.post('/users', function(req, res, next) {
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
        res.json(newUser.toJSON());
      });
      return;
    }

  });
});

router.get('/users', function(req, res, next){
  // TODO: return the list of users.
  var options = {
    offset: parseInt(req.query.offset, 10) || 0,
    hits: parseInt(req.query.hits) || 10,
  };
  User.find(options, function(err, users){
    if (err){
      res.status(err.code).json({message: err.message});
      return;
    }
    res.json(users);
  });
});

router.get('/users/:id', function(req, res, next){
  // TODO: return the user specified by `id`
  var uid = req.params.id;
  if (!uid){
    res.status(400).json({'message': 'no user id specified.'});
    return;
  }

  User.get_by_id(uid, function(err, user){
    if (err){
      res.status(err.code).json({'message': err.message});
      return;
    }

    res.json(user);
  });

});

router.post('/posts', function(req, res, next) {
  // TODO: create a new posts in the DB.
  var post = req.body;
  console.log('post from body');
  console.log(post);

  var newPost = new Post(post);
  newPost.save(function(err){
    // TODO: handle err...
    res.json(newPost.toJSON());
  });
});

router.get('/posts', function(req, res, next){
  // TODO: return the list of posts by a user.
  var userid = req.query.userid;
  if (!userid){
    res.status(400).json({message: 'Missing userid'});
    return;
  }

  var options = {
    offset: parseInt(req.query.offset, 10) || 0,
    hits: parseInt(req.query.hits) || 10,
    userid: req.query.userid,
  };
  Post.find(options, function(err, posts){
    if (err){
      res.status(err.code).json({message: err.message});
      return;
    }
    res.json(posts);
  });
});

router.get('/posts/:id', function(req, res, next){
  // TODO: return the post specified by `id`
  var pid = req.params.id;
  if (!pid){
    res.status(400).json({'message': 'no post id specified.'});
    return;
  }

  Post.get_by_id(uid, function(err, post){
    if (err){
      res.status(err.code).json({'message': err.message});
      return;
    }

    res.json(post);
  });

});

module.exports = router;
