'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            options: {
                paths: ['/styles'],
                optimization: 0
            },
            all: {
                files: ['...']
            }
        }
    });
};
