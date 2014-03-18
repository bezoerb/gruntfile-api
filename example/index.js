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
    esformatter = require('esformatter'),
    gruntfile = fs.readFileSync('test/fixtures/Gruntfile.js', 'utf-8').toString(),
    multiline = require('multiline');


var output = api.init(gruntfile)

    .addGlobalDeclaration('test1',[3,4,5,(new Date()).getTime()])
    .addGlobalDeclaration('test2',42)
    .addGlobalDeclaration('test3','abc')
    .addGlobalDeclaration('test4',function(test){ return test * test; })
    .loadNpmTasks('less')
    .insertConfig('less',{
        options: {
            paths: ['/styles'],
            optimization: 0
        },
        dist: {
            files: [
                {expand: true, cwd:  '/styles', src: ['*.less'], dest: '.tmp/styles', ext: '.css'}
            ]
        },
        all: {
            files: [
                {expand: true, cwd:  '/styles', src: ['*.less'], dest: '.tmp/styles', ext: '.css'}
            ]
        }

    }).toString();

console.log(output);
console.log('---------');

// for a list of available options check "lib/preset/default.json"
var options = {
    // inherit from the default preset
    preset : 'default',
    indent : {
        value : '  '
    },
    lineBreak : {
        before : {
            BlockStatement : 1,
            DoWhileStatementOpeningBrace : 1
        }
    },
    whiteSpace : {
    }
};

var formattedCode = esformatter.format(output,options);

console.log(formattedCode);

//
//var output = api.init(gruntfile)
//    .addGlobalDeclaration('test1',[{d:4}])
//    .addGlobalDeclaration('test2',42)
//    .addGlobalDeclaration('test3','abc')
//    .addGlobalDeclaration('test4',function(test){ return test * test; })
//    .registerTask('defaultdefault', [42])
//    .registerTask('default', function(target){
//        grunt.task.run(['jshint']);
//    })
//    .registerTask('test', function(target,t2){
//        if (target === 'build') {
//            grunt.task.run(['watch']);
//        }
//    },'skip')
//    .registerTask('test', [42])
//    .insertConfig('testtask',{  tests: ['test/**/*_test.js'] })
//    .insertRawConfig('testtask','{ abc : (new Date()).getTime() }')
//    .insertRawConfig('watch', multiline(function(){/*
//        {
//            js: {
//                options: {
//                    time: (new Date()).getTime()
//                },
//                files: MYPREVIOUSDECLAREDFILES,
//                tasks: ['jshint']
//            }
//        }
//    */}))
//    .toString();

//console.log(output);

