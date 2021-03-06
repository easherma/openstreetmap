
var osm = require('../index');
var isObject = require('is-object');

module.exports.tests = {};

// test exports
module.exports.tests.interface = function(test, common) {

  var streams = [
    'pbfParser',
    'docConstructor',
    'docDenormalizer',
    'tagMapper',
    'adminLookup',
    'addressExtractor',
    'deduper',
    'categoryMapper',
    'dbMapper',
    'elasticsearch',
    'import'
  ];

  streams.forEach(function (stream) {
    test('interface: ' + stream, function(t) {
      t.equal(typeof osm[stream], 'function', 'stream factory');
      t.end();
    });
  });

  test('interface: stream count', function(t) {
    t.equal( Object.keys(osm).length, streams.length + 1, 'correct number of streams');
    t.end();
  });

  test('interface: osm.config.categoryDefaults', function(t) {
    t.true(isObject( osm.config.categoryDefaults ), 'default mapping object');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('index: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};