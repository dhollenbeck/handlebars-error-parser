'use strict';

var assert = require('assert');
var hbs = require('handlebars');
var parser = require('../index.js').parser;

describe('Incomplete Expressions', function () {
	it('empty expression', function () {
		var parsed;
		try {
			hbs.precompile('{{}}');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 3,
				endLine: 1,
				endColumn: 4,
				message: 'empty Handlebars expression'
			});
		}
	});

	it('empty expression', function () {
		var parsed;
		try {
			hbs.precompile('{{');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 3,
				endLine: 1,
				endColumn: 4,
				message: 'invalid Handlebars expression'
			});
		}
	});

	it('empty expression', function () {
		var parsed;
		try {
			hbs.precompile('{{');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 3,
				endLine: 1,
				endColumn: 4,
				message: 'invalid Handlebars expression'
			});
		}
	});
	it('parse error', function () {
		var parsed;
		try {
			hbs.precompile('{{foo');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 3,
				endLine: 1,
				endColumn: 4,
				message: 'invalid Handlebars expression'
			});
		}
	});
});