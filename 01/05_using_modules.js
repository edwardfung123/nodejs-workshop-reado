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

// Load our own module
var local_var = 'DEF';

var Redso = require('./05_redso_module.js');

Redso.test();

console.log('local_var = ' + local_var);
console.log('Redso.get_local_var() = ' + Redso.get_local_var());
