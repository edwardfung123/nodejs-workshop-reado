// load the fs module. It is the `import` or `#include` in nodejs.
// see [full doc](https://nodejs.org/docs/v0.10.35/api/fs.html)

var fs = require('fs');

// Let's read a file using the asyn way.
//
// Asyn operations are the CORE of node.
// For more detail about fs.readFile, see [here](https://nodejs.org/docs/v0.10.35/api/fs.html#fs_fs_readfile_filename_options_callback)

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function(err, data){
  // Note that the file is loaded completely into the memory first and stored
  // in `data`. What if the file size is large?
  if (err){
    console.error('We got en error', err);
    throw err;
  }

  // print the content.
  console.log(data);
});


// If the file size is large, it will take a long time and memory to load the
// file into memory. It is even worse if you are not using ASYNC callback.
// The process/thread will be blocked. To iOS developer, it is like running 
// a long function in the UI thread. The phone will be not responsive and hang
// up.
