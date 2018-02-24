(function () {
	'use strict';

	var regex1 = /^Parse error on line ([0-9]+)+:\n([^\n].*)\n([^\n].*)\n(.*)$/;
	var regex2 = /^(.*) - ([0-9]+):([0-9]+)$/;

	function friendlyMessage(message) {
		if (message.indexOf("got 'INVALID'") !== -1) return 'invalid Handlebars expression';
		if (message === "Expecting 'EOF', got 'OPEN_ENDBLOCK'") return 'invalid closing block, check opening block';
		return message;
	}

	var parser = function (e) {
		var parsed = {};
		if (!e) return;
		if (typeof e.message !== 'string') return;

		e.message.replace(regex1, function (match, line, code, indicator, message) {
			parsed.startLine = +line;
			parsed.startColumn = +indicator.length;
			parsed.endLine = parsed.startLine;
			parsed.endColumn = parsed.startColumn + 1;
			parsed.message = friendlyMessage(message);
			return '';
		});
		e.message.replace(regex2, function(match, message, line, column) {
			parsed.startLine = +line;
			parsed.startColumn = +column;
			parsed.endLine = parsed.startLine;
			parsed.endColumn = parsed.startColumn + 1;
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
