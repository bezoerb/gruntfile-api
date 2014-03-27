# gruntfile-api [![Build Status](https://secure.travis-ci.org/bezoerb/gruntfile-api.png?branch=master)](http://travis-ci.org/bezoerb/gruntfile-api)

Api to programmatically modify your gruntfile


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

### Overview

- [Add global declaration](#add-global-declaration)
- [Add RAW global declaration](#add-raw-global-declaration)
- [Register task](#register-task)
- [Insert task config](#insert-task-config)
- [Insert RAW task config](#insert-raw-task-config)
- [Get the updated Gruntfile content](#get-the-updated-gruntfile-content)
- [Get JSON object with all configured tasks](#get-json-object-with-all-configured-tasks)
- [Test Gruntfile for task config](#test-gruntfile-for-task-config)
- [loadNpmTask](#loadnpmtask)
- [Test Gruntfile for property inside task config](#test-gruntfile-for-property-inside-task-config)

### Add global declaration

Add a global variable declaration to the gruntfile.
declarations get seamlessly integrated into existing declaration structures.
Keep in mind that function calls like `require('module')` will be evaluated when passed to the function line this
Use ['addGlobalDeclarationRaw`](#add-raw-global-declaration) to prevent evaluation.


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

### Add RAW global declaration

Add a global variable declaration to the gruntfile.
declarations get seamlessly integrated into existing declaration structures

```javascript
api.addGlobalDeclarationRaw(identifier,value)
```
#### parameter.identifier
Type: `string`

#### parameter.value
Type: `string`

### example

```javascript
api.addGlobalDeclaration('path','require(\'path\')')
```

adds the following code right before `module.exports = function (grunt)`

```javascript
var path = require('path');
```

### Register task

Register grunt task with `grunt.registerTask`.
when there already is a task registered with the same identifier. The tasks will get merged based on the `mergeType` argument unless this one is invalid or `skip`
Merge will be done in one of the following ways depending on the mergeType:

* registered task is `array` and task is `array` -> default merge
* registered task is `function` and task is `array` -> merge will add grunt.task.run(tasks) to registered task body
* registered task is `array` and task is `function` -> merge will add grunt.task.run(registered tasks) to task body
* registered task is `function` and task is `function` -> merge will add task function body to registered task function body


```javascript
api.registerTask(identifier,value)
```
#### parameter.identifier
Type: `string`

The task identifier

#### parameter.value
Type: `array|function`

The task which are invoked

#### parameter.mergeType
Type: `string` can be one of the following: `['prepend','append','overwrite','skip']`
Default: `'append'`

How should tasks should be merged when there already is a task with the same identifier registered

### example

```javascript
api.registerTask('default',['jshint','uglify'])
```

adds the following code to the gruntfile

```javascript
grunt.registerTask('default', ['jshint', 'uglify']);
```
### merge example

```javascript
api.registerTask('default',['jshint'],'prepend');
```

gruntfile before

```javascript
grunt.registerTask('default', function(target) {
	grunt.task.run(['uglify']);
};
```

gruntfile after

```javascript
grunt.registerTask('default', function(target) {
	grunt.task.run(['jshint']);
	grunt.task.run(['uglify']);
};
```


### Insert task config

Insert Task configuration to the Gruntfile.
Existing configurations should not be overwritten. That means, that the task target is added to the config if it already exists.
Options will be added to the target configuration when the task already exists so that any existing configuration won't be messed up.
Options that are already configured identically in the global task options will be dropped.
Keep in mind that variable names or function calls will be evaluated when passed to the function line this
When there's the need for variables or date objects use [`insertRawConfig`](#insert-raw-task-config)


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
        options: {
            time: (new Date()).getTime()
        },
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
    }
})
```

adds the following code to the gruntfile

```javascript
watch: {
    gruntfile: {
        options: {
            time: 1394485101147
        },
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
        options: {
            time: 1394485101147
        },
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
    }
}
```

### Insert RAW task config

Insert task configuration to the Gruntfile as String to prevent code evaluation


```javascript
api.insertRawConfig(name,descriptor)
```
#### parameter.name
Type: `string`

The task identifier


#### parameter.descriptor
Type: `string`

The task configuration as string.

### example

```javascript
api.insertRawConfig('watch', "{  js: { options: { time: (new Date()).getTime() }, files: MYPREVIOUSDECLAREDFILES, tasks: ['jshint'] } }")
```

adds the following code to the gruntfile

```javascript
watch: {
    js: {
        options: {
            time: (new Date()).time()
        },
        files: MYPREVIOUSDECLAREDFILES,
        tasks: ['jshint']
    }
}
```

or appends it.

### Get the updated Gruntfile content

```javascript
api.toString()
```


### Get JSON object with all configured tasks

Invalid JSON Objects like variables or functions will added as String for information purpose

```javascript
api.getJsonTasks()
```

### Test Gruntfile for task config

Invalid JSON Objects like variables or functions will added as String for information purpose

```javascript
api.hasConfig(identifier)
```

#### parameter.identifier
Type: `string`

The task identifier

### loadNpmTask

Add loadNpmTasks call to Gruntfile.
When `load-grunt-tasks` is active or the requested plugin is already loaded nothing will be added to the Gruntfile.

```javascript
api.loadNpmTasks(pluginName)
```


#### parameter.pluginName
Type: `string`

The plugin name

### Test Gruntfile for property inside task config

Invalid JSON Objects like variables or functions will added as String for information purpose

```javascript
api.hasConfigProperty(identifier, property)
```

#### parameter.identifier
Type: `string`

The task identifier

#### parameter.property
Type: `string`|`array`

The property identifier

## Examples

See examples/index.js

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.0.1 - First very alpha!

v0.0.2 - Added some more functionality to the api

## License
Copyright (c) 2014 Ben Zörb. Licensed under the MIT license.
