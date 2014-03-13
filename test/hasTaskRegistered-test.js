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

api.init(fs.readFileSync(path.join(__dirname, 'fixtures', 'Gruntfile.js'), 'utf-8').toString());

/*
 Tests for registerTask
 */
describe('hasTaskRegistered', function() {

    it('should return true for every registered task', function() {
        var expected = ['server','test','build','default'];

        expected.forEach(function(identifier){
            assert.ok(api.hasTaskRegistered(identifier),'It should have task "' + identifier + '" registered');
        });

    });

    it('should return false when task is not registered', function() {
        var expected = ['mocha'];

        expected.forEach(function(identifier){
            assert.notOk(api.hasTaskRegistered(identifier),'It should not have task "' + identifier + '" registered');
        });

    });
});

