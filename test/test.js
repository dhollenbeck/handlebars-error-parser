'use strict';

var assert = require('assert');
var hbs = require('handlebars');
var parser = require('../index.js').parser;

describe('Handlebars Parse Error', function () {
	
	it('mismatched block helpers', function () {
		var parsed;
		try {
			hbs.precompile('{{#foo}}{{/bar}}');
		} catch (e) {
			parsed = parser(e.message);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 3,
				endLine: 1,
				endColumn: 4,
				message: 'foo doesn\'t match bar'
			});
		}
	});
	it('mismatched block helpers', function () {
		var parsed;
		try {
			hbs.precompile('{{foo}}{{/foo}}');
		} catch (e) {
			//console.log(e.message);
			parsed = parser(e.message);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 8,
				endLine: 1,
				endColumn: 9,
				message: 'invalid closing block, check opening block'
			});
		}
	});
	it('parse error', function () {
		var parsed;
		try {
			hbs.precompile('{{foo');
		} catch (e) {
			//console.log(e.message);
			parsed = parser(e.message);
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