module.exports = function (grunt) {
    grunt.initConfig({
        nodeunit: { files: ['test/**/*_test.js'] },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: [
                    'jshint:lib',
                    'nodeunit'
                ]
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: [
                    'jshint:test',
                    'nodeunit'
                ]
            }
        }
    });
};