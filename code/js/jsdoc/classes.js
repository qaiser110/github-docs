/*
I have an object fooEngine which has a method start, a method pause, and a property state. The methods have no parameter.
  I'm trying to document that properly. I would prefer to define a type. Finding little to no documentation about @typedef, I had to make a lot of failures... I used the following code:
*/

/**
 * Your classic Foo Engine
 * @typedef {Object} Foo Engine
 * @method start Starts the Foo Engine
 * @method stop Stops the Foo Engine
 * @property {String} state Current state of the Foo Engine
 */

/**
 * My own Foo Engine
 * @type {FooEngine}
 */
var fooEngine; //Will be used for all tests
