var DB = require('./sqlite.js');
var db = DB.getDB();
if (!db){
  DB.init('test.db');
}
var util = require('util');
var _ = require('underscore');

// We still use the in memory users.
//var users = [];

db.serialize(function(){
  // I really hate SQL but have to get used to it (o:
  // And JS does not have multiline string syntax(o:
  var columnDefinitions = [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'name TEXT',
    'email TEXT',
  ];
  db.run(
    'CREATE TABLE IF NOT EXISTS users (' + columnDefinitions.join(', ') + ')');
});


function User(user, options){
  //console.log('new User');
  //console.log(user);
  this.attr = user;
};

User.prototype.get = function(key){
  return this.attr[key];
};

User.ERRORS = {
  USER_NOT_FOUND: 404,
};

User.get_by_id = function(uid, cb){
  var sql = db.prepare('SELECT * FROM users WHERE id = $id');
  sql.get({
    $id: uid,
  },
  function(err, user){
    if (user === undefined){
      err = {
        code: 404,
        message: 'not found',
      };
    } else {
      user = new User(user);
    }
    process.nextTick(function(){
      cb(err, user);
    });
  });
  sql.finalize();
};

User.find = function(options, cb){
  console.log(options);
  options = _.defaults(options, {offset: 0, limit: 10});
  //var u = users.slice(options.offset, options.offset + options.hits);
  var sql = db.prepare('SELECT * FROM users LIMIT $limit OFFSET $offset');
  sql.all({
    $limit: options.hits,
    $offset: options.offset,
  }, function(err, u){
    process.nextTick(function(){
      cb(err, u)
    });
    
  });
  sql.finalize(function(err){
    if (err){
      process.nextTick(function(){
        cb(err, null)
      });
    }
  });

};

User.prototype.save = function(cb){
  cb = cb || function(){};
  console.log(this);
  //users.push(this);
  var sql = db.prepare('INSERT INTO users (name, email) VALUES ($name, $email)');
  var values = _.defaults(this.attr, {email: '', name: ''});
  sql.run({
    $email: values.email,
    $name: values.name,
  });
  console.log(sql);
  sql.finalize(function(err){
    process.nextTick(function(){
      cb(err);
    });
  });
  //var err = null;
  //process.nextTick(function(){
  //  cb(err);
  //});
};

User.prototype.toJSON = function(){
  return this.attr;
};
module.exports = User;
