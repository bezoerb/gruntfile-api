module.exports = function (grunt) {
    grunt.initConfig({});
    grunt.registerTask('default', function (target) {
        if (target) {
            grunt.task.run([
                'watch',
                'css'
            ]);
        }
    });
};