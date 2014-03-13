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
describe('addGlobalDeclaration', function() {

    it('should global declaration 42', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .toString();

        expect(output).to.equal(rfs('expected/addGlobalDeclaration-1.js'));
    });

    it('should add multiple global declarations', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        expect(output).to.equal(rfs('expected/addGlobalDeclaration-2.js'));
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

        expect(output).to.equal(rfs('expected/addGlobalDeclaration-3.js'));
    });

    it('should integrate with comma separated vars', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain_var.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        expect(output).to.equal(rfs('expected/addGlobalDeclaration-4.js'));
    });

    it('should integrate with multiple var statements', function() {
        var gruntfile = fs.readFileSync(path.join(__dirname, 'fixtures', 'plain_vars.js'));
        var output = api.init(gruntfile)
            .addGlobalDeclaration('test', 42)
            .addGlobalDeclaration('test1', 43)
            .addGlobalDeclaration('test2', 44)
            .toString();

        expect(output).to.equal(rfs('expected/addGlobalDeclaration-5.js'));
    });

});