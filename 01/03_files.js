// load the fs module. It is the `import` or `#include` in nodejs.
// see [full doc](https://nodejs.org/docs/v0.10.35/api/fs.html)

var fs = require('fs');

// Let's read a file using the asyn way.
//
// Asyn operations are the CORE of node.
// For more detail about fs.readFile, see [here](https://nodejs.org/docs/v0.10.35/api/fs.html#fs_fs_readfile_filename_options_callback)

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function(err, data){
  if (err){
    console.error('We got en error', err);
    throw err;
  }

  console.log(data);
});

// Let's try read another file here.
fs.readFile('./package.json', {encoding: 'utf-8'}, function(err, data){
  if (err){
    console.error('We got en error', err);
    throw err;
  }

  console.log(data);
});

// Since the code is running in asyn mode, the two readFile() call are actually
// run in "parallel". Which callback will be triggered first is "unpredictable".
// It really depends on the filesize, OS, CPU usage and etc.
//
// In this case, the /etc/shadow is a larger file. It takes more time for the OS
// to load the whole file and call the callback. So the /etc/password is printed
// after the content of ./package.json
//
// The moral of the story: Coding in async style is really hard. 
