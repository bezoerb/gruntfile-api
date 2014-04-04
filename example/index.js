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
    gruntfile = fs.readFileSync('test/fixtures/Gruntfile.js', 'utf-8').toString(),
    multiline = require('multiline');


var output = api.init(gruntfile)
    .addGlobalDeclarationRaw('path','require("path")')
    .toString();



console.log(output);
