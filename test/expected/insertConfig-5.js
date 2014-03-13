module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            js: {
                options: { time: new Date().getTime() },
                files: MYPREVIOUSDECLAREDFILES,
                tasks: ['jshint']
            }
        }
    });
};