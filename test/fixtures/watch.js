'use strict';
module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };


    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            javascript: {
                files: ['<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['jshint']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/{,*/}*.php',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        
        /**
         * Compiling sources
         */
        
        less: {
            options: {
                paths: ['<%= yeoman.app %>/styles'],
                optimization: 0
            },
            all: {
                files: [
                    {expand: true, cwd:  '<%= yeoman.app %>/styles', src: ['*.less'], dest: '.tmp/styles', ext: '.css'}
                ]
            }
        }
    });

   

    grunt.registerTask('default', [
        'less',
        'watch'
    ]);
};


