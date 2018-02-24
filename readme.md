# handlebars-error-parser

The purpose of this module is to parse the Handlebars compile exceptions messages into a more useable format which can be used in handlebars linter(s). Handlebars throws different exceptions depending the template error.

Handlebars exception types:
- **Parser Error:** handlebars can't compile the template.
- **Block Error:** the open and close block helpers do not match.

This module parses these errors and converts them into:
```js
{
    startLine: 1,
    startColumn: 3,
    endLine: 1,
    endColumn: 4,
    message: 'foo doesn\'t match bar'
}
```

# Install

```bash
npm install handlebars-error-parser --save
```

In Node.js:
```js
var parser = require('handlebars-error-parser').parser;
var parsed;
try {
    hbs.precompile('{{#foo}}{{/bar}}');
} catch (e) {
    parsed = parser(e.message);
}
```

In browser:
```html
<script src="handlebars-error-parser.js"></script>
```
```js
var parsed;
try {
    hbs.precompile('{{#foo}}{{/bar}}');
} catch (e) {
    parsed = window.handlebarsErrorParser(e.message);
}
```

# Block Error: Mismatched: block helpers

```hbs
{{#foo}}{{/bar}}
```
```text
foo doesn't match bar - 1:3
```
# Block Error: Mismatached: closing helpler
```hbs
{{foo}}{{/foo}}
```
```text
Parse error on line 1:
{{foo}}{{/foo}}
-------^
Expecting 'EOF', got 'OPEN_ENDBLOCK'
```
# Parse Error: Missing helper or variable closing

```hbs
{{foo
```
```text
Parse error on line 1:
{{foo
--^
Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'INVALID'
```

# Parse Error: Missing block helper closing

```hbs
{{#foo
```
```text
Parse error on line 1:
{{#foo
---^
Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'INVALID'
```