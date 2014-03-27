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

var api = require('../lib/api.js'),
    fs = require('fs'),
    esformatter = require('esformatter'),
    gruntfile = fs.readFileSync('test/fixtures/Gruntfile.js', 'utf-8').toString(),
    multiline = require('multiline');


var output = api.init(gruntfile)
    .insertRawConfig('watch', multiline(function(){/*
        {
            // ADD TEST COMMENT
            js: {
                // main options
                options: {
                    time: (new Date()).getTime()
                },
                // some other stuff
                files: MYPREVIOUSDECLAREDFILES,
                tasks: ['jshint']
            }
        }
    */}))
    .toString();



console.log(output);
