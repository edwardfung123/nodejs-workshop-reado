// Using modules from the internet
// Use the following command to install packages

//   npm install underscore underscore.string

// Then load the modules with require().

// Basically, you can load the modules anywhere.
var _ = require('underscore');
var s = require("underscore.string");

var members = ['matchman', 'dave', 'rem', 'jo', 'edward'];

// Use the each() in _

_.each(members, function(member, i){
  console.log(member);
});

console.log('------------------');

// define a variable. In fact the name of this variable is same as the variable in the module..
var local_var = 'DEF';

// Load our own module
var Redso = require('./05_redso_module.js');

// Do something
Redso.test();

// Let's check the values.
console.log('local_var = ' + local_var);
console.log('Redso.get_local_var() = ' + Redso.get_local_var());
