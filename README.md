# grunttool [![Build Status](https://secure.travis-ci.org/bezoerb/grunttool.png?branch=master)](http://travis-ci.org/bezoerb/grunttool)

Api to programmatically modify your gruntfile

THIS IS IN VERY EARLY DEVELOPMENT



## Getting Started
Install the module with: `npm install grunttool`

```javascript
var grunttool = require('grunttool');
var output = grunttool.init(gruntfile)
    .addGlobalDeclaration('var test = 42;')
    .registerTask("grunt.registerTask('default', [42]);")
    .addTask(task)
    .getScript();
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Ben Zörb. Licensed under the MIT license.
