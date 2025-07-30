// Mock for CSS modules
module.exports = new Proxy(
  {},
  {
    get: function(target, key) {
      // Return the key as the value for any requested property
      return key;
    },
  }
);
