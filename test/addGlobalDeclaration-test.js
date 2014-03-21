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
    esformatter = require('esformatter'),
    path = require('path');

/* Read file sync sugar. */
var rfs = function rfs(file) {
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
describe('addGlobalDeclaration', function() {

    it('should global declaration 42', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .toString();

        testOutput(output,'addGlobalDeclaration-1.js');
    });

    it('should add multiple global declarations', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        testOutput(output,'addGlobalDeclaration-2.js');
    });

    it('should add global declarations of different types', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('int', 42)
            .addGlobalDeclaration('str', 'this one is a string')
            .addGlobalDeclaration('arr', ['a'])
            .addGlobalDeclaration('obj', {a:'b'})
            .addGlobalDeclaration('fnc', function(test) {
                return test;
            })
            .toString();

        testOutput(output,'addGlobalDeclaration-3.js');
    });

    it('should integrate with comma separated vars', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain_var.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        testOutput(output,'addGlobalDeclaration-4.js');
    });

    it('should integrate with multiple var statements', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain_vars.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        testOutput(output,'addGlobalDeclaration-5.js');
    });

    it('should throw an exception if variable already declared', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain_vars.js'));
        try {
            var output = api.init(gruntfile)
                .addGlobalDeclaration('test', 42)
                .addGlobalDeclaration('test', 42);

            assert.fail('Should throw an exception');
        } catch (err) {
            assert.ok('Passed :)');
        }
    });

});