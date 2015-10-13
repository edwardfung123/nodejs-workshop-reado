var DB = require('./sqlite.js');
var db = DB.getDB();
if (!db){
  DB.init('test.db');
}
var util = require('util');
var _ = require('underscore');

db.serialize(function(){
  var columnDefinitions = [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'message TEXT',     // the short message
    'userid INTEGER',   // the owner
    'ctime DEFAULT CURRENT_TIMESTAMP',    // the creation time
  ];
  db.run(
    'CREATE TABLE IF NOT EXISTS posts (' + columnDefinitions.join(', ') + ')');
});


function Post(post, options){
  this.attr = post;
};

Post.prototype.get = function(key){
  return this.attr[key];
};

Post.ERRORS = {
  POST_NOT_FOUND: 404,
};

Post.get_by_id = function(uid, cb){
  var sql = db.prepare('SELECT * FROM posts WHERE id = $id');
  sql.get({
    $id: uid,
  },
  function(err, post){
    if (post === undefined){
      err = {
        code: 404,
        message: 'not found',
      };
    } else {
      post = new Post(post);
    }
    process.nextTick(function(){
      cb(err, post);
    });
  });
  sql.finalize();
};

Post.find = function(options, cb){
  console.log(options);
  options = _.defaults(options, {offset: 0, limit: 10});
  var sql = db.prepare('SELECT * FROM posts WHERE userid = $userid ORDER BY ctime DESC LIMIT $limit OFFSET $offset');
  sql.all({
    $limit: options.hits,
    $offset: options.offset,
    $userid: options.userid,
  }, function(err, posts){
    process.nextTick(function(){
      cb(err, _.map(posts, function(post){ return new Post(post); }));
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

Post.prototype.save = function(cb){
  cb = cb || function(){};
  console.log(this);
  var sql = db.prepare('INSERT INTO posts (message, userid) VALUES ($message, $userid)');
  var values = _.defaults(this.attr, {message: '', userid: ''});
  sql.run({
    $message: values.message,
    $userid: values.userid,
  });
  console.log(sql);
  sql.finalize(function(err){
    process.nextTick(function(){
      cb(err);
    });
  });
};

Post.prototype.toJSON = function(){
  return this.attr;
};
module.exports = Post;
