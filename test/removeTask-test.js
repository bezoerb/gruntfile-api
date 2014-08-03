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
describe('removeTask', function() {

    it('should remove the task from registered tasks and configuration', function() {

        var json;

        api.removeTask('default');
        api.removeTask('build');
        api.removeTask('plato');
        json = JSON.parse(api.getJsonTasks());
        assert.ok(!api.hasTaskRegistered('default'));
        assert.ok(!api.hasTaskRegistered('build'));
        assert.ok(!('plato' in json));

    });

});

