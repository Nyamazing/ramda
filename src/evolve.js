var _curry2 = require('./internal/_curry2');


/**
 * Creates a new object by recursively evolving a shallow copy of `object`, according to the
 * `transformation` functions. All non-primitive properties are copied by reference.
 *
 * A `tranformation` function will not be invoked if its corresponding key does not exist in
 * the evolved object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', elapsed: 100, remaining: 1400};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}}
 */
module.exports = _curry2(function evolve(transformations, object) {
  var transformation, key, type, result = {};
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key])
                : type === 'object'   ? evolve(transformations[key], object[key])
                                      : object[key];
  }
  return result;
});
