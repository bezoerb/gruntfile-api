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
    assert = require('chai').assert,
    fs = require('fs'),
    path = require('path');

/*
 Tests for registerTask
 */
describe('getJsonTasks', function() {
    it('should return a valid json file', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'Gruntfile.js')),
            json, tasks;

        try {
            json = api.init(gruntfile).getJsonTasks();
        } catch (err) {
            assert.fail('It should load some JSON');
        }

        try {
            tasks = JSON.parse(json);
        } catch (err) {
            assert.fail('It should be able to parse JSON');
        }
    });

    it('should contain all tasks', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'Gruntfile.js')),
            expected = ['yeoman','clean','watch','less','php2html','jshint','mocha','bower','requirejs','modernizr',
                'processhtml','useminPrepare','usemin','imagemin','svgmin','cssmin','uncss','htmlmin','prettify','rev',
                'copy','concurrent','open','connect','plato'],
            json = api.init(gruntfile).getJsonTasks(),
            tasks = JSON.parse(json);

        expect(tasks).to.include.keys(expected);
        expected.forEach(function(identifier){
            assert.ok(tasks.hasOwnProperty(identifier),'It should have config "' + identifier + '"');
        });

    });
});

