// Let's see how we read files in SERIES.

// Create a function to wrap the file loading code.
//
// path: string, the file path.
//
// cb: function, the callback when the file content is read from disk to memory.
function readOneFile(path, cb){
  // you can load the module anywhere.
  var fs = require('fs');

  // Read the file
  fs.readFile(path, {encoding: 'utf-8'}, function(err, data){
    // Call the callback.
    cb(err, data);
  });
}

// Define the files to read.
var file1 = '/etc/passwd';
var file2 = './package.json';

// Read the first file.
readOneFile(file1, function(err1, data1){
  if (err1){
    console.error('we got an error', err1);
    throw err;
  }

  console.log(data1);

  // Read the 2nd file now.
  readOneFile(file2, function(err2, data2){
    if (err2){
      console.error('we got an error', err2);
      throw err;
    }

    console.log(data2);

    // Read more files here.
  });
});

// You should now see how painful to use async code to do things in sequential
// manner which is the default mode for other language such as C, Java, Obj-C,
// Python.

// When the program which the end of the file, the program will exit normally.
// But since we have open socket (network, file io), the program will not
// terminated and wait until the socket(s) is closed. It is quite tricky when
// you write script that run once only.
