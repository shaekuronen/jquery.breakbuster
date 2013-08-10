(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#breakbuster', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.breakbuster(), this.elems, 'should be chainable');
  });

  test('is breakbuster', function() {
    expect(1);
    strictEqual(this.elems.breakbuster().text(), 'breakbuster0breakbuster1breakbuster2', 'should be breakbuster');
  });

  module('jQuery.breakbuster');

  test('is breakbuster', function() {
    expect(2);
    strictEqual($.breakbuster(), 'breakbuster.', 'should be breakbuster');
    strictEqual($.breakbuster({punctuation: '!'}), 'breakbuster!', 'should be thoroughly breakbuster');
  });

  module(':breakbuster selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is breakbuster', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':breakbuster').get(), this.elems.last().get(), 'knows breakbuster when it sees it');
  });

}(jQuery));
