var util = require('util');
var _ = require('underscore');

// We still use the in memory users.
var users = [];

function User(user, options){
  console.log('new User');
  console.log(user);
  this.attr = user;
};

// Create some dummy record.
_.each(_.range(0, 100), function(i){
  users.push(new User({
    id: i,
    name: 'name-' + i,
  }));
});

User.prototype.get = function(key){
  return this.attr[key];
};

User.ERRORS = {
  USER_NOT_FOUND: 404,
};

User.get_by_id = function(uid, cb){
  var user = _.find(users, function(u, i){
    //console.log(i);
    //console.log(u);
    return u.get('id') == uid;
  });
  var err = null;

  if (!user){
    err = {
      'code': User.ERRORS.USER_NOT_FOUND,
      'message': 'Not found',
    };
  }

  process.nextTick(function(){
    cb(err, user);
  });
};

User.find = function(options, cb){
  console.log(options);
  var u = users.slice(options.offset, options.offset + options.hits);
  var err = null;
  process.nextTick(function(){
    cb(err, u)
  });
};

User.prototype.save = function(cb){
  console.log(this);
  users.push(this);
  var err = null;
  process.nextTick(function(){
    cb(err);
  });
};

User.prototype.toJSON = function(){
  return this.attr;
};
module.exports = User;
