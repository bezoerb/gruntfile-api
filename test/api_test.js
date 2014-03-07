'use strict';

var api = require('../lib/api.js'),
    fs = require('fs');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var gruntfile = fs.readFileSync('Gruntfile.js');

exports.api = {
    setUp: function(done) {
        // setup here
        done();
    },
    'global declaration int': function(test) {
        test.expect(1);

        var output = api.init(gruntfile)
            .addGlobalDeclaration('test',42)
            .getScript();


        test.ok(/test\s=\s42/.test(output),'Output should have global declaration attached');

        test.done();
    },
    'global declaration string': function(test) {
        test.expect(1);

        var output = api.init(gruntfile)
            .addGlobalDeclaration('test','42')
            .getScript();


        test.ok(/test\s=\s'42'/.test(output),'Output should have global declaration attached');

        test.done();
    },
    'global declaration array': function(test) {
        test.expect(1);

        var output = api.init(gruntfile)
            .addGlobalDeclaration('test',[42])
            .getScript();


        test.ok(/test\s=\s\[42\]/.test(output),'Output should have global array attached');

        test.done();
    },
    'global declaration object': function(test) {
        test.expect(1);

        var output = api.init(gruntfile)
            .addGlobalDeclaration('test',{a:'42'})
            .getScript();


        test.ok(/test\s=\s\{ a: '42' \}/.test(output),'Output should have global object attached');

        test.done();
    },
    'global declaration function': function(test) {
        test.expect(2);

        var output = api.init(gruntfile)
            .addGlobalDeclaration('test',function(x){return x*x;})
            .getScript();

        test.ok(/test\s=\sfunction\(x\)\{/);
        test.ok(/return x * x;/);
        test.done();
    },
    'register task': function(test) {
        test.expect(1);
        var output = api.init(gruntfile)
            .registerTask('default', [42])
            .getScript();


        test.ok(/grunt\.registerTask\('default', \[42\]\);/.test(output),'Output should have default task attached');

        test.done();
    },
    'add duplicate task config': function(test){
        test.expect(2);

        var output = api.init(gruntfile)
            .addTask('nodeunit',{files: ['test/**/*_test.js']})
            .getScript();

        test.ok((output.match(/nodeunit:/g) || []).length === 1,'Output should not have additional task attached');
        test.ok((output.match(/files:/g) || []).length === 4,'Output should not have additional task property attached');
        test.done();
    },
    'add task config option': function(test){
        test.expect(2);

        var output = api.init(gruntfile)
            .addTask('nodeunit',{nodeunitfiles: ['test/**/*_test.js']})
            .getScript();


        test.ok((output.match(/nodeunit:/g) || []).length === 1,'Output should not have additional task attached');
        test.ok((output.match(/nodeunitfiles:/g) || []).length === 1,'Output should not have additional task property attached');
        test.done();
    },
    'add task config': function(test){
        test.expect(2);

        var output = api.init(gruntfile)
            .addTask('testtask',{nodeunitfiles: ['test/**/*_test.js']})
            .getScript();


        test.ok((output.match(/testtask:/g) || []).length === 1,'Output should not have additional task attached');
        test.ok((output.match(/nodeunitfiles:/g) || []).length === 1,'Output should not have additional task property attached');
        test.done();
    }
};