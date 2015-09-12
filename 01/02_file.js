// load the fs module
// The full doc (https://nodejs.org/docs/v0.10.35/api/fs.html)

var fs = require('fs');

// Let's read a file using the asyn way.
// Asyn operations is the CORE of node.
// See: https://nodejs.org/docs/v0.10.35/api/fs.html#fs_fs_readfile_filename_options_callback
fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function(err, data){
  if (err){
    console.error('We got en error', err);
    throw err;
  }

  console.log(data);
});
