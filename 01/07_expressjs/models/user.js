var _ = require('underscore');

var users = [];

function User(){
  this.attr = {};
};

User.prototype.get_by_id = function(uid){
  return _.find(users, function(u, i){
    return u.id == uid;
  });
};

User.prototype.save = function(){
  users.push(this.attrs);
};

module.exports = User;
