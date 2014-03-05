
/**
 * Grunt tool
 * programmatically modify gruntfile
 *
 * @author Ben Zörb @bezoerb https://github.com/bezoerb
 * @copyright  Copyright (c) 2014 Ben Zörb
 * All rights reserved.
 *
 * Licensed under the MIT license.
 */
/* global _, esprima, escodegen, traverse */
(function(root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    if (typeof define === 'function' && typeof define.amd === 'object') {
        // AMD. Register as an anonymous module.
        define(['exports', 'lodash', 'esprima', 'escodegen', 'traverse'], factory);
    } else if (typeof exports !== 'undefined') {
        // Node/CommonJS
        factory(exports, require('lodash'), require('esprima'), require('escodegen'), require('traverse'));
    } else {
        // Browser globals
        factory(((root || window).grunttool = {}), _, esprima, escodegen, traverse);
    }
}(this, function(exports, _, esprima, escodegen, traverse) {
    'use strict';

    var esprimaOptions = {
        comment: true,
        range: true,
        loc: false,
        tokens: true,
        raw: false
    };

    var escodegenOptions = {
        comment: true,
        format: {
            indent: {
                adjustMultilineComment: true
            }
        }
    };

    var ast,
        traversal,
        loadGruntTasks = false;


    /**
     * Get AST snippet from code
     * @param code
     * @returns {parts.body}
     */
    function getAstFromCode(code) {
        return esprima.parse(code, esprimaOptions).body;
    }

    /**
     * has value
     * @param value
     * @returns {Boolean|boolean}
     */
    function has(value) {
        return _.contains(traversal.nodes(), value);
    }

    /**
     * get function expression for main grunt node
     * module.exports = function (grunt)
     *
     * @param node (traversal)
     * @returns {*|boolean}
     */
    function isGruntMainRoot(traversalNode) {
        var node = traversalNode.node;
        return node && node.hasOwnProperty('type') &&
            node.type === 'FunctionExpression' &&
            node.hasOwnProperty('params') &&
            _(node.params).where({name: 'grunt'}).size() > 0;
    }


    /**
     * get main gruntfile body
     * every node inside grunt main root
     * @param node
     */
    function isGruntMainBody(traversalNode) {
        return traversalNode.parent && traversalNode.parent.parent &&
            traversalNode.key === 'body' && _.isArray(traversalNode.node) &&
            isGruntMainRoot(traversalNode.parent.parent);
    }


    /**
     * get main task body
     * every node inside grunt.initConfig
     * @param node
     */
    function isInitConfigBody(traversalNode) {
        var expression;

        if (!traversalNode.parent || !traversalNode.parent.parent || !traversalNode.parent.parent.parent) {
            return false;
        }

        expression = traversalNode.parent.parent.parent;

        return traversalNode.key === 'properties' && expression.key === 'expression' &&
            expression.node.hasOwnProperty('callee') &&
            expression.node.callee.hasOwnProperty('object') &&
            expression.node.callee.hasOwnProperty('property') &&
            expression.node.callee.object.name === 'grunt' &&
            expression.node.callee.property.name === 'initConfig';
    }

    function isTaskBody(traversalNode,taskName) {
        return traversalNode.key === 'properties' && traversalNode.parent && traversalNode.parent.parent &&
            traversalNode.parent.parent.parent && traversalNode.parent.parent.parent &&
            isInitConfigBody(traversalNode.parent.parent.parent) &&
            traversalNode.parent.parent.node.key.name === taskName;
    }


    /**
     * fetch metadata such as the use of load-grunt-tasks
     *
     * @param code
     * @returns {*}
     */
    function registerTask(code) {
        var syntax = getAstFromCode(code);
        traversal.forEach(function(node) {
            if (isGruntMainBody(this)) {
                this.update(node.concat(syntax));
            }
        });

        return exports;
    }

    /**
     * Add task configuration
     *
     * @param code
     * @returns {*}
     */
    function addTask(code) {
        var completeCode = 'var tmp = {' + code + '}',
            codeAst = getAstFromCode(completeCode),
            syntax = traverse(codeAst).get(['0','declarations','0','init','properties','0']),
            taskName = syntax ? syntax.key.name : void(0),
            taskOptions = [];

        if (typeof syntax === 'undefined') {
            throw new Error('Invalid task syntax');
        }


        if (syntax.hasOwnProperty('value') && syntax.value.hasOwnProperty('properties')) {
            taskOptions = _.map(syntax.value.properties,function(prop){
                return prop.key.name;
            });
        }

        // task is not already there
        if (!hasTask(taskName)) {
            traversal.forEach(function(node) {
                if (isInitConfigBody(this)) {
                    node.push(syntax);
                    this.update(node);
                }
            });

        // add config to present task
        } else if (!hasTaskProperty(taskName,taskOptions)) {
            syntax = traverse(codeAst).get(['0','declarations','0','init','properties','0','value','properties']);
            traversal.forEach(function(node) {
                if (isTaskBody(this,taskName)) {
                    this.update(node.concat(syntax));
                }
            });
        }
        return exports;
    }


    /**
     * Check if a task is already registered
     *
     * @param identifier
     * @returns {boolean}
     */
    function hasTaskRegistered(identifier) {
        var tasks = [];
        traversal.forEach(function(node) {
            if (isGruntMainBody(this)) {
                tasks = _.filter(node, function(n) {
                    return (/registerTask/).test(JSON.stringify(n)) &&
                        _.first(n.expression['arguments']).hasOwnProperty('value') &&
                        _.first(n.expression['arguments']).value === identifier;
                });
            }
        });

        return _.size(tasks) > 0;
    }

    /**
     * return tasks object for checking
     *
     * @param identifier
     * @returns {boolean}
     */
    function getTasks() {
        var tasks = [];
        traversal.forEach(function(node) {
            if (isGruntMainBody(this)) {
                tasks = _(node).filter(function(n) {
                    return n.type === 'ExpressionStatement' &&
                        n.expression.hasOwnProperty('callee') &&
                        n.expression.callee.hasOwnProperty('object') &&
                        n.expression.callee.hasOwnProperty('property') &&
                        n.expression.callee.object.name === 'grunt' &&
                        n.expression.callee.property.name === 'initConfig';
                }).map(function(n) {
                    return _.first(n.expression['arguments']).properties;
                }).first();
            }
        });

        return tasks;
    }

    /**
     * Check if task already configured
     * @param identifier
     * @returns {boolean}
     */
    function hasTask(identifier) {
        var tasks = getTasks();
        return _.filter(tasks,function(task){
            return task.hasOwnProperty('key') && task.key.name === identifier;
        }).length > 0;
    }


    /**
     * check if option is already configured for task
     * @param identifier
     * @param properties
     * @returns {boolean}
     */
    function hasTaskProperty(identifier,properties) {
        var tasks = getTasks();
        return hasTask(identifier) && _(tasks).filter(function(task){
            return task.hasOwnProperty('value') && task.value.hasOwnProperty('properties') &&
                _.filter(task.value.properties,function(prop){
                    return _.indexOf(properties,prop.key.name) >= 0;
                }).length;
        }).size() > 0;
    }


    /**
     * Initialize code
     * @param code
     * @returns {*}
     */
    function init(code) {

        ast = esprima.parse(code, esprimaOptions);
        ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
        traversal = traverse(ast.body);


        loadGruntTasks = has('load-grunt-tasks');


        return exports;
    }


    /**
     * Add global variable declaration to ast
     * @param tree
     * @param code
     * @returns {*}
     */
    function addGlobalDeclaration(code) {
        // find index
        var syntax = getAstFromCode(code);
        var index = _.findIndex(ast.body, function(node) {
            return node.type === 'VariableDeclaration' ||
                node.type === 'ExpressionStatement' &&
                    node.expression.type === 'AssignmentExpression';
        });

        // add to comma separated list of variables if available
        if (_.isArray(ast.body[index].declarations) && ast.body[index].declarations.length > 1) {
            var declarations = ast.body[index].declarations;
            ast.body[index].declarations = declarations.concat(syntax[0].declarations);

            // otherwise add before first VariableDeclaration || AssignmentExpression
        } else {
            ast.body = _.first(ast.body, index)
                .concat(esprima.parse(code).body)
                .concat(_.rest(ast.body, index));
        }
        return exports;
    }


    function getScript() {
        return escodegen.generate(ast, escodegenOptions);

    }

    exports.init = init;
    exports.getScript = getScript;
    exports.addTask = addTask;
    exports.hasTask = hasTask;
    exports.hasTaskRegistered = hasTaskRegistered;
    exports.addGlobalDeclaration = addGlobalDeclaration;
    exports.registerTask = registerTask;

}));