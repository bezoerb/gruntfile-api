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
    beautify = require('js-beautify').js_beautify,
    gruntfile = fs.readFileSync('Gruntfile.js');



var output = api.init(gruntfile)
    .addGlobalDeclaration('test1',[1,2,3,{d:4}])
    .addGlobalDeclaration('test2',42)
    .addGlobalDeclaration('test3','abc')
    .addGlobalDeclaration('test4',{a:77,b:[1,2,3],c:function(test){ return test * test; }})

    .registerTask('default', [42])
    .insertConfig('testtask',{  tests: ['test/**/*_test.js'] })
    .insertRawConfig('testtask','{ abc : (new Date()).getTime() }')
    .toString();

var tasks = api.getJsonTasks();


output = beautify(output, {
    indent_size: 4
});

console.log(output);