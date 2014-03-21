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
/*jshint -W098 */
/* global describe, it, before, grunt */
var api = require('../lib/api.js'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    esformatter = require('esformatter'),
    gruntfile;

/* Read file sync sugar. */
var rfs = function(file) {
    return fs.readFileSync(path.join(__dirname, file), 'utf-8').toString();
};
var testOutput = function testOutput(output,filename) {
    var expected = rfs('expected/' + filename);
    expected = esformatter.format(expected);
    output = esformatter.format(output);
    expect(output).to.equal(expected);
};

/*
 Tests for registerTask
 */
describe('registerTask', function() {
    // load gruntfile before each task
    before(function(done) {
        fs.readFile(path.join(__dirname, 'fixtures', 'plain.js'), function(err, output) {
            if (err) {
                throw err;
            }
            gruntfile = output.toString();
            done();
        });
    });

    it('should output something', function() {
        var output = api.init(gruntfile).toString();
        expect(output).to.not.equal('');
    });

    // Add Tasks
    it('should add default task with jshint and uglify', function() {
        var output = api.init(gruntfile)
            .registerTask('default', ['jshint','uglify'])
            .toString();

        testOutput(output,'registerTask-a1.js');
    });
    it('should add default task function which calls  jshint and uglify', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(){
                grunt.task.run(['jshint','uglify']);
            })
            .toString();
        testOutput(output,'registerTask-a2.js');
    });

    // Merge array with array
    it('should prepend watch and css to default task', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'prepend')
            .toString();

        testOutput(output,'registerTask-aa1.js');
    });

    it('should append watch and css to default task', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'append')
            .toString();

        testOutput(output,'registerTask-aa2.js');
    });

    it('should overwrite default task with watch and css', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'overwrite')
            .toString();

        testOutput(output,'registerTask-aa3.js');
    });

    // Merge array with function
    it('should prepend watch and css to default task function', function() {
        var output = api.init(gruntfile).registerTask('default', function(){
            grunt.task.run(['jshint','uglify']);
        }).registerTask('default', ['watch','css'],'prepend').toString();

        testOutput(output,'registerTask-merge1.js');
    });

    it('should append watch and css to default task function', function() {
        var output = api.init(gruntfile).registerTask('default', function(){
            grunt.task.run(['jshint','uglify']);
        }).registerTask('default', ['watch','css'],'append').toString();

        testOutput(output,'registerTask-merge2.js');
    });

    it('should overwrite default task function with watch and css', function() {
        var output = api.init(gruntfile).registerTask('default', function(){
            grunt.task.run(['jshint','uglify']);
        }).registerTask('default', ['watch','css'],'overwrite').toString();

        testOutput(output,'registerTask-merge3.js');
    });

    // Merge function with array
    it('should prepend watch and css function to default task', function() {
        var output = api.init(gruntfile)
            .registerTask('default', ['jshint','uglify'])
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'prepend').toString();

        testOutput(output,'registerTask-merge1.js');
    });
    it('should append watch and css function to default task', function() {
        var output = api.init(gruntfile)
            .registerTask('default', ['jshint','uglify'])
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'append').toString();

        testOutput(output,'registerTask-merge2.js');
    });
    it('should overwrite default task with watch and css function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', ['jshint','uglify'])
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'overwrite').toString();

        testOutput(output,'registerTask-merge3.js');
    });

    // Merge function with function
    it('should prepend watch and css function to default task function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'prepend').toString();

        testOutput(output,'registerTask-merge1.js');
    });
    it('should append watch and css function to default task function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'append').toString();

        testOutput(output,'registerTask-merge2.js');
    });
    it('should overwrite default task function with watch and css function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(){
                grunt.task.run(['watch','css']);
            },'overwrite').toString();

        testOutput(output,'registerTask-merge3.js');
    });

    // fix variables
    it('should rename param names', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(t){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(target){
                if (target){
                    grunt.task.run(['watch','css']);
                }
            },'prepend').toString();

        testOutput(output,'registerTask-params1.js');
    });
    it('should append watch and css function to default task function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(t){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(target,target2){
                if (target && target2){
                    grunt.task.run(['watch','css']);
                }
            },'append').toString();

        testOutput(output,'registerTask-params2.js');
    });
    it('should overwrite default task function with watch and css function', function() {
        var output = api.init(gruntfile)
            .registerTask('default', function(t1,t2){
                grunt.task.run(['jshint','uglify']);
            })
            .registerTask('default', function(target){
                if (target){
                    grunt.task.run(['watch','css']);
                }
            },'overwrite').toString();

        testOutput(output,'registerTask-params3.js');
    });
});