Cut BOM
============

Cut the BOM for your file.

## Usage

```bash
$ npm install cut_bom -g
$ cut_bom package.json
$ cut_bom index.js
```

## Scripting

```js
var cut = require('cut_bom');
cut("/path/to/your/file.js", function (err) {
  // done.
});
```

## License
The MIT License. Enjoy open sources.
