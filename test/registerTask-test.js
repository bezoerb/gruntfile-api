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
/* global describe, it, before */
var api = require('../lib/api.js'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    gruntfile;

/* Read file sync sugar. */
var rfs = function(file) {
    return fs.readFileSync(path.join(__dirname, file), 'utf-8').toString();
};

/*
 Tests for registerTask
 */
describe('registerTask', function() {
    /* Wait until uncss finished doing its thing before running our tests */
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

    it('should add default task with jshint and uglify', function() {
        var output = api.init(gruntfile)
            .registerTask('default', ['jshint','uglify'])
            .toString();

        expect(output).to.equal(rfs('expected/registerTask-1.js'));
    });

    it('should prepend watch and css to default task', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'prepend')
            .toString();

        expect(output).to.equal(rfs('expected/registerTask-2.js'));
    });

    it('should append watch and css to default task', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'append')
            .toString();

        expect(output).to.equal(rfs('expected/registerTask-3.js'));
    });

    it('should overwrite default task with watch and css', function() {
        var output = api.init(gruntfile).registerTask('default', ['jshint','uglify'])
            .registerTask('default', ['watch','css'],'overwrite')
            .toString();

        expect(output).to.equal(rfs('expected/registerTask-4.js'));
    });
});