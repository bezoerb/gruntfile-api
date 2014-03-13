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
    multiline = require('multiline'),
    gruntfile;

/* Read file sync sugar. */
var rfs = function(file) {
    return fs.readFileSync(path.join(__dirname, file), 'utf-8').toString();
};

/*
 Tests for registerTask
 */
describe('inserConfig', function() {
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

    it('should add nodeunit config', function() {
        var output = api.init(gruntfile)
            .insertConfig('nodeunit',{files: ['test/**/*_test.js']})
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-1.js'));
    });

    it('should add nodeunit config only once', function() {
        var output = api.init(gruntfile)
            .insertConfig('nodeunit',{files: ['test/**/*_test.js']})
            .insertConfig('nodeunit',{files: ['test/**/*_test.js']})
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-1.js'));
    });

    it('should add nodeunit config only once with diferent targets', function() {
        var output = api.init(gruntfile)
            .insertConfig('nodeunit',{files: ['test/**/*_test.js']})
            .insertConfig('nodeunit',{otherFiles: ['test/**/*_test.js']})
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-2.js'));
    });

    it('should add multiple configs', function() {
        var output = api.init(gruntfile)
            .insertConfig('nodeunit',{files: ['test/**/*_test.js']})
            .insertConfig('watch',{
                gruntfile: {
                    files: '<%= jshint.gruntfile.src %>',
                    tasks: ['jshint:gruntfile']
                },
                lib: {
                    files: '<%= jshint.lib.src %>',
                    tasks: ['jshint:lib', 'nodeunit']
                },
                test: {
                    files: '<%= jshint.test.src %>',
                    tasks: ['jshint:test', 'nodeunit']
                }
            })
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-3.js'));
    });

    it('raw - should add nodeunit config', function() {
        var output = api.init(gruntfile)
            .insertRawConfig('nodeunit',"{files: ['test/**/*_test.js']}")
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-1.js'));
    });

    it('raw - should add nodeunit config only once', function() {
        var output = api.init(gruntfile)
            .insertRawConfig('nodeunit',"{files: ['test/**/*_test.js']}")
            .insertRawConfig('nodeunit',"{files: ['test/**/*_test.js']}")
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-1.js'));
    });

    it('raw - should add nodeunit config only once with diferent targets', function() {
        var output = api.init(gruntfile)
            .insertRawConfig('nodeunit',"{files: ['test/**/*_test.js']}")
            .insertRawConfig('nodeunit',"{otherFiles: ['test/**/*_test.js']}")
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-2.js'));
    });

    it('raw - should add nodeunit config with date function', function() {
        var output = api.init(gruntfile)
            .insertRawConfig('init',"{time: (new Date()).getTime()}")
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-4.js'));
    });

    it('raw - should add nodeunit config with date function, variable and array', function() {
        var output = api.init(gruntfile)
            .insertRawConfig('watch', multiline(function(){/*
                {
                    js: {
                        options: {
                            time: (new Date()).getTime()
                        },
                        files: MYPREVIOUSDECLAREDFILES,
                        tasks: ['jshint']
                    }
                }
            */}))
            .toString();

        expect(output).to.equal(rfs('expected/insertConfig-5.js'));
    });

});