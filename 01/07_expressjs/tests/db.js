var User = require('../models/user_sql.js');
var _ = require('underscore');

var count = 0;
var maxUser = 10

// Create some dummy record.
_.each(_.range(0, maxUser), function(i){
  //users.push(new User({
  //  id: i,
  //  name: 'name-' + i,
  //}));
  var user = new User({
    $name: 'name-' + i,
  });
  user.save(function(err){
    if (err){
      console.error(err);
      return;
    }

    finishOne();
  });
});

var finishOne = function(){
  count++;
  if (count == maxUser){
    User.get_by_id(3, function(err, user){
      console.log(err);
      console.log(user);

      User.get_by_id(55, function(err2, user2){
        console.log(err2);
        console.log(user2);
      });
    });
  }
};
