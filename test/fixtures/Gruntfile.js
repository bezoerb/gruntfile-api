'use strict';

var LIVERELOAD_PORT,lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
    gateway = require('gateway'),
    path = require('path');


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
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
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
        
        // Compiling sources
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
        },

        php2html: {
            all: {
                options: {
                    // relative links should be renamed from .php to .html
                    processLinks: true,
                    htmlhint: true,
                    docroot: '<%= yeoman.app %>',
                    process: function(test){
                        return test;
                    }
                },
                files: [
                    {expand: true, cwd: yeomanConfig.app, src: ['**/*.php','!bower_components/**/*.php'], dest: '.tmp', ext: '.html' }
                ]
            }
        },

        

        /**
         * Testing Tools
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/**/*.js',
                '!<%= yeoman.app %>/scripts/config.js',
                // no tests on external code, won't make you happy
                '!<%= yeoman.app %>/scripts/vendor/**/*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    log: true,
                    // Select a Mocha reporter
                    // http://visionmedia.github.com/mocha/#reporters
                    // Pipe output console.log from your JS to grunt. False by default.
                    reporter: 'Spec',
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test/index.html']
                }
            }
        },
        
        /**
         * Scripts
         */
        bower: {
            options: {
                baseUrl: '<%= yeoman.app %>/bower_components',
                exclude: [
                    'almond',
                    'requirejs',
                    'modernizr',
                    'mocha',
                    'chai'
                ]
            },
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/config.js'
            }
        },
        requirejs: {
            all: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl                 : '<%= yeoman.app %>/bower_components',
                    name                    : 'almond/almond',
                    include                 : 'main',
                    out                     : '<%= yeoman.dist %>/scripts/main.js',
                    mainConfigFile          : '<%= yeoman.app %>/scripts/config.js',
                    preserveLicenseComments : false,
                    useStrict               : true,
                    wrap                    : true,
                    optimize                : 'uglify2',
                    generateSourceMaps      : true,
                    useSourceUrl            : true
                }
            }
        },
        modernizr: {
            dist: {
                // [REQUIRED] Path to the build you're using for development.
                'devFile': '.tmp/concat/scripts/vendor/modernizr.js',

                // [REQUIRED] Path to save out the built file.
                'outputFile': '.tmp/concat/scripts/vendor/modernizr.js',

                // Based on default settings on http://modernizr.com/download/
                'extra': {
                    'shiv': true,
                    'printshiv': false,
                    'load': true,
                    'mq': false,
                    'cssclasses': true
                },

                // Based on default settings on http://modernizr.com/download/
                'extensibility': {
                    'addtest': false,
                    'prefixed': false,
                    'teststyles': false,
                    'testprops': false,
                    'testallprops': false,
                    'hasevents': false,
                    'prefixes': false,
                    'domprefixes': false
                },

                // By default, source is uglified before saving
                'uglify': true,

                // Define any tests you want to implicitly include.
                'tests': [],

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                'parseFiles': true,

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
                // You can override this by defining a 'files' array below.
                'files': {src: ['/scripts/**/*.js', '.tmp/uncss/**/*.css'] },

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                'matchCommunityTests': false,

                // Have custom Modernizr tests? Add paths to their location here.
                'customTests': []
            }
        },
        
        /**
         * Performance optimization
         */
        processhtml: {
            dist: {
                files: [
                    {expand: true, cwd: '.tmp', src: ['**/*.html', '!bower_components/**/*.html'], dest: '.tmp'}
                ]
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: { 'js': ['concat', 'uglifyjs'], 'css': []},
                        post: {}
                    }
                }
            },
            html: ['.tmp/**/*.html', '!bower_components/**/*.html']
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>'],
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: '.tmp/uncss/styles/',
                src: ['*.css'],
                dest: '<%= yeoman.dist %>/styles/'
            }
        },
        uncss: {
            options: {
                verbose:true,
                ignore: [/* ignore css selectors for async content with complete selector or regexp */]
            },
            main: {
                files: {
                    '.tmp/uncss/styles/main.css': ['.tmp/index.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: '**/*.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        prettify: {
            options: {
                prettifyrc: '.prettifyrc'
            },
            all: {
                expand: true,
                cwd: '<%= yeoman.dist %>',
                ext: '.html',
                src: ['**/*.html'],
                dest: '<%= yeoman.dist %>'
            }
        },
        
        /**
         * File based Cache busting
         */
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        
        /**
         * Copy && Concurrent
         */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '**/*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/concat/styles',
                    dest: '<%= yeoman.dist %>/styles',
                    src: [
                        '{,*/}*.css'
                    ]
                }]
            },
            prepare: {
                expand: true,
                cwd: '<%= yeoman.app %>',
                dest: '.tmp/',
                src: [
                    'styles/**/*.{css,js}',
                    'bower_components/**/*.{css,js}'
                ]
            }
        },
        concurrent: {
            server: [
                'less'
            ],
            test: [
                'less'
            ],
            dist: [
                'less',
                'imagemin',
                'svgmin'
            ]
        },
        
        /**
         * Server
         */
        open: {
            app: {
                path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.php'
            },
            dist: {
                path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.html'
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '127.0.0.1'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            gateway(__dirname + path.sep + yeomanConfig.app, {
                                '.php': 'php-cgi'
                            }),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    hostname: '127.0.0.1',
                    port: 9999,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },

            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        
        /**
         * Documentation
         */
        plato: {
            options : {
                jshint : grunt.file.readJSON('.jshintrc')
            },
            all: {
                'src': ['Gruntfile.js','<%= yeoman.app %>/scripts/**/*.js','test/spec/**/*.js'],
                'dest': 'docs/complexity'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:dist', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open:app',
            'watch'
        ]);
    });



    grunt.registerTask('test',  function () {
        grunt.task.run(['jshint:all']);

        // testserver
        grunt.task.run(['clean:server', 'connect:test']);


        // mocha
        grunt.task.run(['mocha']);

    });


    grunt.registerTask('build', [
        'test',
        'clean:dist',
        'php2html',
        'bower',
        'copy:prepare',
        'processhtml',
        'useminPrepare',
        'concurrent:dist',
        'uncss',
        'concat',
        'requirejs',
        'modernizr',
        'uglify',
        'copy:dist',
        'uglify',
        'cssmin:dist',
        'rev',
        'usemin',
        'prettify',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'test',
        'server'
    ]);
};


