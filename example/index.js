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

var grunttool = require('../lib/grunttool.js'),
    fs = require('fs'),
    beautify = require('js-beautify').js_beautify,
    gruntfile = fs.readFileSync('Gruntfile.js');


var task = "testtask: {tests: ['test/**/*_test.js']}";

var output = grunttool.init(gruntfile)
    .addGlobalDeclaration('var test = 42;')
    .registerTask("grunt.registerTask('default', [42]);")
    .addTask(task)
    .getScript();


output = beautify(output, {
    indent_size: 4
});

console.log(output);