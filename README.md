# gruntfile-api [![Build Status](https://secure.travis-ci.org/bezoerb/gruntfile-api.png?branch=master)](http://travis-ci.org/bezoerb/gruntfile-api)

Api to programmatically modify your gruntfile

THIS IS IN VERY EARLY DEVELOPMENT



## Getting Started
Install the module with: `npm install gruntfile-api`

```javascript
var api = require('gruntfile-api');
var output = api.init(gruntfile)
    .addGlobalDeclaration('test',42)
    .registerTask('default', ['jshint'])
    .addTask('jshint',{test: {
       src: ['test/**/*.js','!test/fixtures/**/*.js']
    }})
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
