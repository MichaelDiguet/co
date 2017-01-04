
var assert = require('assert');

var co = require('..');

var ctx = {
  some: 'thing'
};
ctx.isYieldable = function (obj) {
  return 'number' == typeof obj;
};
ctx.toPromise = function (obj) {
  return Promise.resolve(obj + 1);
};

describe('yield <custom yieldable>', function () {
  it('should throw an error', function () {
    return co.call(ctx, function* () {
      try {
        yield null;
        throw new Error('lol');
      } catch (err) {
        assert(err instanceof TypeError);
        assert(~err.message.indexOf('You may only yield'));
        assert(~err.message.indexOf('or custom yieldable'));
      }
    })
  })
  it('should use the custom toPromise function for custom type', function () {
    return co.call(ctx, function* () {
      var test = yield 2;
      assert(test === 3);
    })
  })
  it('should not use the custom toPromise function for supported type', function () {
    return co.call(ctx, function* () {
      var test = yield {some: 'thing'};
      assert(test.some === 'thing');
    })
  })
})
