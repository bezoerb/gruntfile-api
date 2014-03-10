# gruntfile-api [![Build Status](https://secure.travis-ci.org/bezoerb/gruntfile-api.png?branch=master)](http://travis-ci.org/bezoerb/gruntfile-api)

Api to programmatically modify your gruntfile

THIS IS IN VERY EARLY DEVELOPMENT


## Getting Started
Install the module with: `npm install gruntfile-api`

```javascript
var api = require('gruntfile-api'),
    fs = require('fs'),
    gruntfileData = fs.readFileSync('Gruntfile.js');

var output = api.init(gruntfileData)
    // change something
    .toString();
```

## Documentation

### Add global declaration

Add a global variable declaration to the gruntfile.
declarations get seamlessly integrated into existing declaration structures

```javascript
api.addGlobalDeclaration(identifier,value)
```
#### parameter.identifier
Type: `string`

#### parameter.value
Type: `mixed`

### example

```javascript
api.addGlobalDeclaration('defaultTasks',['jshint','uglify'])
```

adds the following code right before `module.exports = function (grunt)`

```javascript
var defaultTasks = ['jshint','uglify'];
```
or
```javascript
var varA = 'something',
    varB = 'something else',
    defaultTasks = ['jshint','uglify'];
```

### Register task

```javascript
api.registerTask(identifier,value)
```
#### parameter.identifier
Type: `string`

The task identifier

#### parameter.value
Type: `mixed`

The task which are invoked

### example

```javascript
api.registerTask('default',['jshint','uglify'])
```

adds the following code to the gruntfile

```javascript
grunt.registerTask('default', ['jshint', 'uglify']);
```

### Insert task config

Insert Task configuration to the Gruntfile.
Existing configurations should not be overwritten.


```javascript
api.insertConfig(name,descriptor)
```
#### parameter.name
Type: `string`

The task identifier


#### parameter.descriptor
Type: `mixed`

The task configuration

### example

```javascript
api.insertConfig('watch', {
    gruntfile: {
         files: 'Gruntfile.js',
         tasks: ['jshint:gruntfile']
    }
})
```

adds the following code to the gruntfile

```javascript
watch: {
    gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
    }
}
```

or adds the watch target to an existing watch configuration

```javascript
watch: {
    lib: {
        files: 'lib/**/*.js',
        tasks: ['jshint:lib', 'nodeunit']
    },
    gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
    }
}
```

### Get the updated Gruntfile content

```javascript
api.toString()
```


### Get JSON object with all configured tasks

```javascript
api.getJsonTasks()
```


## Examples

See examples/index.js

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Ben Zörb. Licensed under the MIT license.
