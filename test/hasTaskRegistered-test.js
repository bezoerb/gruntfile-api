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
var api,
    expect = require('chai').expect,
    assert = require('chai').assert,
    fs = require('fs'),
    path = require('path');

/*
 Tests for registerTask
 */
describe('hasTaskRegistered', function() {
    // load gruntfile before each task
    before(function(done) {
        fs.readFile(path.join(__dirname, 'fixtures', 'Gruntfile.js'), function(err, output) {
            if (err) {
                throw err;
            }

            api = require('../lib/api.js').init(output.toString());
            done();
        });
    });

    it('should return true for ever registered task', function() {
        var expected = ['server','test','build','default'];

        expected.forEach(function(identifier){
            assert.ok(api.hasTaskRegistered(identifier),'It should have task "' + identifier + '" registered');
        });

    });
});

