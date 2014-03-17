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
    path = require('path');

/* Read file sync sugar. */
var rfs = function(file) {
    return fs.readFileSync(path.join(__dirname, file), 'utf-8').toString();
};

/*
 Tests for registerTask
 */
describe('loadNpmTasks', function() {

    it('should add loadNpmTasks', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .loadNpmTasks('grunt-contrib-jshint')
            .toString();

        expect(output).to.equal(rfs('expected/loadNpmTasks-1.js'));
    });

    it('should not add already added loadNpmTasks', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .loadNpmTasks('grunt-contrib-jshint')
            .loadNpmTasks('grunt-contrib-jshint')
            .toString();

        expect(output).to.equal(rfs('expected/loadNpmTasks-1.js'));
    });
});