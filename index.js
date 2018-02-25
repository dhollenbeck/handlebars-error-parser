(function () {
	'use strict';

	var regex1 = /^Parse error on line ([0-9]+)+:\n([^\n].*)\n([^\n].*)\n(.*)$/;
	var regex2 = /^(.*) - ([0-9]+):([0-9]+)$/;

	function friendlyMessage(message) {
		if (message.indexOf("got 'INVALID'") !== -1) return 'invalid Handlebars expression';
		if (message === "Expecting 'EOF', got 'OPEN_ENDBLOCK'") return 'invalid closing block, check opening block';
		if (message === "Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'CLOSE'") return 'empty Handlebars expression';
		if (message === "Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'EOF'") return 'invalid Handlebars expression';
		return message;
	}

	var parser = function (e, html) {
		var parsed = {};
		var lines;
		if (!e) return;
		if (typeof e.message !== 'string') return;
		if (typeof html !== 'string') return;

		lines = html.split('\n');

		function getPos(lineNum, code) {

			code = code.replace('...', '').replace('...', '');

			var line = lines[lineNum];
			var min = line.indexOf(code);
			var max = min + code.length;
			return {
				min: min,
				max: max
			}
		}

		e.message.replace(regex1, function (match, lineNum, code, indicator, message) {

			var pos;
			lineNum = +lineNum;
			lineNum = lineNum - 1;
			pos = getPos(lineNum, code);

			parsed.minLine = lineNum;
			parsed.minColumn = pos.min;
			parsed.maxLine = lineNum;
			parsed.maxColumn = pos.max;
			parsed.message = friendlyMessage(message);
			return '';
		});
		e.message.replace(regex2, function(match, message, lineNum, columnNum) {

			lineNum = +lineNum;
			lineNum = lineNum - 1;
			columnNum = +columnNum;
			columnNum = columnNum - 1;

			parsed.minLine = lineNum;
			parsed.minColumn = columnNum;
			parsed.maxLine = parsed.minLine;
			parsed.maxColumn = parsed.minColumn + 1;
			parsed.message = friendlyMessage(message);
			return '';
		});
		return parsed;
	};

	if ('undefined' !== typeof window) { // eslint-disable-line no-undef
		window.HandlebarsErrorParser = parser; // eslint-disable-line no-undef
	}

	if ('undefined' !== typeof module) { // eslint-disable-line no-undef
		exports.parser = parser; // eslint-disable-line no-undef
	}
})();
