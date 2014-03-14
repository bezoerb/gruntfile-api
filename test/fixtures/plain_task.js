'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            all: {
                files: [
                    {expand: true, cwd:  '/styles', src: ['*.less'], dest: '.tmp/styles', ext: '.css'}
                ]
            }
        }
    });
};
