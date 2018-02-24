'use strict';


module.exports = function(grunt) {

	grunt.config('eslint', {
		options: {
			rulePaths: ['node_modules/@esscorp/eslint/rules']
		},
		// backend: {
		// 	options: {
		// 		configFile: 'node_modules/@esscorp/eslint/configs/backend.js'
		// 	},
		// 	nonull: true,
		// 	src: [
		// 		'*.js'
		// 	]
		// },
		frontend: {
			options: {
				configFile: 'node_modules/@esscorp/eslint/configs/frontend.js'
			},
			nonull: true,
			src: [
				'index.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
};
