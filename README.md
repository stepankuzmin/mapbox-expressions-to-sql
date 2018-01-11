# mapbox-expressions-to-sql

[![Greenkeeper badge](https://badges.greenkeeper.io/stepankuzmin/mapbox-expressions-to-sql.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/stepankuzmin/mapbox-expressions-to-sql.svg?branch=master)](https://travis-ci.org/stepankuzmin/mapbox-expressions-to-sql)

Transform Mapbox GL style specification [decision expressions](https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-decision) to SQL `WHERE` clause conditions.

### Installation

```shell
npm i mapbox-expressions-to-sql
```

### Usage

```js
const parse = require('mapbox-expressions-to-sql');

parse(["has", "key"]) === 'key IS NOT NULL';

parse(["==", "key", "value"]) === "key = 'value'";

parse(["!=", "key", "value"]) === "key <> 'value'";

parse([">", "key", "value"]) === "key > 'value'";

parse([">=", "key", "value"]) === "key >= 'value'";

parse(["<", "key", "value"]) === "key < 'value'";

parse(["<=", "key", "value"]) === "key <= 'value'";

parse(["in", "key", "v0", "v1", "v2"]) === "key IN ('v0', 'v1', 'v2')";

parse(["all", ["==", "key0", "value0"], ["==", "key1", "value1"]]) === "key0 = 'value0' AND key1 = 'value1'";
```

See [tests](https://github.com/stepankuzmin/mapbox-expressions-to-sql/blob/master/test.js) for more examples.