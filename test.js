const test = require('tape');
const msseParse = require('./');

const parse = expression => msseParse(JSON.parse(expression));

test('Existential Filters', (t) => {
  t.equal(parse('["has", "key"]'), 'key IS NOT NULL');
  t.equal(parse('["!has", "key"]'), 'key IS NULL');
  t.end();
});

test('Comparison Filters', (t) => {
  t.equal(parse('["==", "key", "value"]'), "key = 'value'");
  t.equal(parse('["!=", "key", "value"]'), "key <> 'value'");
  t.equal(parse('[">", "key", "value"]'), "key > 'value'");
  t.equal(parse('[">=", "key", "value"]'), "key >= 'value'");
  t.equal(parse('["<", "key", "value"]'), "key < 'value'");
  t.equal(parse('["<=", "key", "value"]'), "key <= 'value'");
  t.end();
});

test.skip('Set Membership Filters', (t) => {
  t.equal(parse('["in", "key", "v0", "v1", "v2"]'), "key IN ('v0', 'v1', 'v2')");
  t.equal(parse('["!in", "key", "v0", "v1", "v2"]'), "key NOT IN ('v0', 'v1', 'v2')");
  t.end();
});

test('Combining Filters', (t) => {
  t.equal(
    parse('["all", ["==", "key0", "value0"], ["==", "key1", "value1"], ["==", "key2", "value2"]]'),
    "key0 = 'value0' AND key1 = 'value1' AND key2 = 'value2'"
  );
  t.equal(
    parse('["any", ["==", "key0", "value0"], ["==", "key1", "value1"], ["==", "key2", "value2"]]'),
    "key0 = 'value0' OR key1 = 'value1' OR key2 = 'value2'"
  );
  t.end();
});
