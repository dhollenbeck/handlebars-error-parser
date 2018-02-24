'use strict';

var pkg = require('./package.json');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: pkg
	});
	grunt.loadTasks('grunts');
	grunt.registerTask('default', ['eslint']);
};
