module.exports = function (grunt) {
    grunt.initConfig({});
    grunt.registerTask('default', function (t) {
        if (t) {
            grunt.task.run([
                'watch',
                'css'
            ]);
        }
        grunt.task.run([
            'jshint',
            'uglify'
        ]);
    });
};