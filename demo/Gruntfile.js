module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			compile: {
				files: {
					'styles/app.css': 'styles/styl/app.styl'
				}
			}
		},
		concat: {
			dist: {
				src: [
					'vendor/bootstrap.min.css',
					'vendor/bootstrap-responsive.min.css',
					'styles/app.css'
				],
				dest: 'styles/app.css'
			}
		},
		watch: {
			files: 'styles/styl/*.styl',
			tasks: ['default']
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['stylus', 'concat']);
};