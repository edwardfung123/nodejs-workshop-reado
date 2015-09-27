var express = require('express');
var router = express.Router();
var _ = require('underscore');

// Things we learnt from exercise 1.
// - some functions like get_by_id is called quite often.
// - better abstract the DB implementation from the API layer.

// Create an in memory users db (o:
var User = require('../models/user.js');

router.post('/users', function(req, res, next) {
  // TODO: create a new user in the DB.
  var user = req.body;
  console.log(user);

  // TODO: check if the user is registered
  var existingUser = _.find(users, function(u, i){
    return u.id = user.id;
  });

  if (existingUser){
    res.status(400).json({'message': 'already registered'});
    return;
  }

  users.push(user);

  // Return the user obj back to the caller
  res.json(user);
});

router.get('/users', function(req, res, next){
  // TODO: return the list of users.
  res.json(users);
});

router.get('/users/:id', function(req, res, next){
  // TODO: return the user specified by `id`
  var uid = req.params.id;
  if (!uid){
    res.status(400).json({'message': 'no user id specified.'});
    return;
  }

  var user = _.find(users, function(u, i){
    console.log(u.id);
    return u.id == uid;
  });

  if (!user){
    res.status(404).json({'message': 'user not found'});
    return;
  }

  res.json(user);
});

module.exports = router;
