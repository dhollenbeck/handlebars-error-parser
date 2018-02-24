'use strict';

var assert = require('assert');
var hbs = require('handlebars');
var parser = require('../index.js').parser;

describe('Handlebars Parse Error', function () {

	
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

	it('block mismatched', function () {
		var parsed;
		try {
			hbs.precompile('{{#foo}}{{/bar}}');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
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
			hbs.precompile('{{#foo}}\n{{/bar}}');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
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
			hbs.precompile('12345678901234567890{{foo}}{{/foo}}');
		} catch (e) {
			//console.log(e);
			parsed = parser(e);
			assert.deepEqual(parsed, {
				startLine: 1,
				startColumn: 24,
				endLine: 1,
				endColumn: 25,
				message: 'invalid closing block, check opening block'
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