// Define the module with module.exports

// This variable is visible in this module ONLY
var local_var = 123;

// Expose the function, variable to the external world.
module.exports = {
  test: function(){
    console.log('This is a test');
  },

  get_local_var: function(){
    return local_var;
  },


};
