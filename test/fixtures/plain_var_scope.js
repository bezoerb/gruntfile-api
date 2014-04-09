'use strict';
var a = 1,
    b = 2,
    mountFolder = function(connect, dir) {
        var path = require('path').resolve(dir);
        return connect.static(path);
    };
module.exports = function (grunt) {
    grunt.initConfig({

    });
};
