'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            options: {
                paths: ['/styles'],
                optimization: 0
            },
            all: { files: ['...'] },
            home: {
                options: {
                    paths: ['/styles/home'],
                    optimization: 5,
                    some: 'thing'
                },
                files: ['...']
            }
        }
    });
};