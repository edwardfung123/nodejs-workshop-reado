var express = require('express');
var router = express.Router();
var _ = require('underscore');

// Create an in memory users db (o:
var users = [];

router.post('/users', function(req, res, next) {
  // TODO: create a new user in the _DB_.
  var user = req.body;
  console.log(user);

  // TODO: check if the user is registered
  var existingUser = null;

  if (existingUser){
    res.status(400).json({'message': 'already registered'});
    return;
  }

  // TODO: save user.

  // Return the user obj back to the caller
  res.json(user);
});

router.get('/users', function(req, res, next){
  // TODO: return the list of users.
});

router.get('/users/:id', function(req, res, next){
  // TODO: return the user specified by `id`
});

module.exports = router;
