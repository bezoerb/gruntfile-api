module.exports = function (grunt) {
    grunt.initConfig({});
    grunt.registerTask('default', function (t, target2) {
        grunt.task.run([
            'jshint',
            'uglify'
        ]);
        if (t && target2) {
            grunt.task.run([
                'watch',
                'css'
            ]);
        }
    });
};