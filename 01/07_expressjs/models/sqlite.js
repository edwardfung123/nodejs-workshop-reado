var sqlite3 = require('sqlite3').verbose();
var db = null
var DB = {
  init: function(filename){
    // open the db
    if (!db){
      db = new sqlite3.Database(filename);
    }

    return db;
  }
};

function cleanup(){
  console.log('cleaning up the db connection');
  if (db){
    db.close();
  }
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

module.exports = DB;
