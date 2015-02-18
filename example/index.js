/**
 *
 * @author Ben Zörb @bezoerb https://github.com/bezoerb
 * @copyright Copyright (c) 2014 Ben Zörb
 *
 * Licensed under the MIT license.
 * http://bezoerb.mit-license.org/
 * All rights reserved.
 */
'use strict';

var api = require('../lib/api.js'),
  fs = require('fs'),
  gruntfile = fs.readFileSync('test/fixtures/plain_task_withoptions.js', 'utf-8').toString(),
  multiline = require('multiline');

var output = api.init(gruntfile)
  .insertConfig('less', {options: {optimization: 1, paths: ['/styles']}, newTask: {files: ['test/**/*_test.js']}})
  .insertConfig('nodeunit', {otherFiles: ['test/**/*_test.js']})
  .registerTask('createCopy', function(folderName) {
    var cwd = grunt.template.process("some/path/to/app");
    var src = grunt.template.process("some/path/to/src");
    var dest = grunt.template.process("some/path/to/dest") + folderName;

    grunt.task.run('...');
  })
  .toString();


console.log(output);
