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
describe('hasConfig', function() {

    it('should return true for ever configured task', function() {
        var expected = ['yeoman','clean','watch','less','php2html','jshint','mocha','bower','requirejs','modernizr',
            'processhtml','useminPrepare','usemin','imagemin','svgmin','cssmin','uncss','htmlmin','prettify','rev',
            'copy','concurrent','open','connect','plato'];

        expected.forEach(function(identifier){
            assert.ok(api.hasConfig(identifier),'It should have config "' + identifier + '"');
        });

    });

    it('should check configured properties inside task', function() {
        assert.ok(api.hasConfigProperty('open','app'),'It should have config "open.app"');
        assert.ok(api.hasConfigProperty('open','dist'),'It should have config "open.dist"');
        assert.ok(api.hasConfigProperty('usemin','options'),'It should have config "usemin.options"');
        assert.ok(api.hasConfigProperty('usemin','html'),'It should have config "usemin.html"');
        assert.ok(api.hasConfigProperty('usemin','css'),'It should have config "usemin.css"');
    });

    it('should return false if task is not configured', function() {
        var expected = ['something','somethingElse'];

        expected.forEach(function(identifier){
            assert.notOk(api.hasConfig(identifier),'It should not have config "' + identifier + '"');
        });

    });

    it('should return false if task property is not configured', function() {
        assert.notOk(api.hasConfigProperty('open','appFail'),'It should have config "open.app"');
        assert.notOk(api.hasConfigProperty('open','distFail'),'It should have config "open.dist"');

    });
});

