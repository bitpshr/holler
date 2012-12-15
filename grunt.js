/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lint: {
      files: ['src/*.js']
    },
    min: {
      dist: {
        src: ['src/holler-client.js'],
        dest: 'dist/<%= pkg.name %>-client.min.js'
      }
    }
  });

  grunt.registerTask('default', ['lint', 'min']);

};
