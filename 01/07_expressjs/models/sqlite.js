var sqlite3 = require('sqlite3').verbose();
var db = null
var DB = {
  init: function(filename){
    // open the db
    if (!db){
      db = new sqlite3.Database(filename);
    }

    return db;
  },
  getDB: function(){
    return db;
  }
};

function cleanup(e){
  console.log('cleaning up the db connection');
  if (db){
    console.log('close the DB');
    db.close(function(err){
      if (err){
        console.log('error in close');
        console.log(err);
        return;
      }
      db = null;
    });
  }
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

module.exports = DB;
