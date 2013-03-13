/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['src/*.js', 'bin/*.js']
		},
		concat: {
			dist: {
				src: ['vendor/alertify/lib/alertify.js', 'src/holler-client.js'],
        		dest: 'dist/<%= pkg.name %>-client.concat.js'
			}
		},
		uglify: {
			build: {
				src: '<%= concat.dist.dest %>',
     	   		dest: 'dist/<%= pkg.name %>-client.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};