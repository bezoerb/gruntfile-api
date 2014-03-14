'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            all: { files: ['...'] },
            home: {
                options: {
                    paths: ['/styles'],
                    optimization: 1
                },
                files: ['...']
            }
        }
    });
};