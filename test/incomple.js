'use strict';

var assert = require('assert');
var hbs = require('handlebars');
var parser = require('../index.js').parser;

describe('Incomplete Expressions', function () {
    it('open empty expression', function () {
        var parsed;
        var html = '{{';
		try {
			hbs.precompile(html);
		} catch (e) {
			//console.log(e);
			parsed = parser(e, html);
			assert.deepEqual({
				minLine: 0,
				minColumn: 0,
				maxLine: 0,
				maxColumn: 2,
				message: 'invalid Handlebars expression'
			}, parsed);
		}
	});
	it('open and closed empty expression', function () {
        var parsed;
        var html = '{{}}';
		try {
			hbs.precompile(html);
		} catch (e) {
			//console.log(e);
			parsed = parser(e, html);
			assert.deepEqual({
				minLine: 0,
				minColumn: 0,
				maxLine: 0,
				maxColumn: 4,
				message: 'empty Handlebars expression'
			}, parsed);
		}
	});

	it('open block empty expression', function () {
        var parsed;
        var html = '{{#';
		try {
			hbs.precompile(html);
		} catch (e) {
			//console.log(e);
			parsed = parser(e, html);
			assert.deepEqual({
				minLine: 0,
				minColumn: 0,
				maxLine: 0,
				maxColumn: 3,
				message: 'invalid Handlebars expression'
			}, parsed);
		}
	});

	it('two open empty expression', function () {
        var parsed;
        var html = '{{{{';
		try {
			hbs.precompile(html);
		} catch (e) {
			//console.log(e);
			parsed = parser(e, html);
			assert.deepEqual({
				minLine: 0,
				minColumn: 0,
				maxLine: 0,
				maxColumn: 4,
				message: 'invalid Handlebars expression'
			}, parsed);
		}
	});
	it('open helper expression', function () {
        var parsed;
        var html = '{{foo';
		try {
			hbs.precompile(html);
		} catch (e) {
			//console.log(e);
			parsed = parser(e, html);
			assert.deepEqual({
				minLine: 0,
				minColumn: 0,
				maxLine: 0,
				maxColumn: 5,
				message: 'invalid Handlebars expression'
			}, parsed);
		}
	});
});