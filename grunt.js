/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lint: {
      files: ['src/*.js', 'bin/*.js']
    },
    concat: {
      dist: {
        src: ['src/alertify.js', 'src/holler-client.js'],
        dest: 'dist/<%= pkg.name %>-client.concat.js'
      }
    },
    min: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>-client.min.js'
      }
    }
  });

  grunt.registerTask('default', ['lint', 'concat', 'min']);

};
