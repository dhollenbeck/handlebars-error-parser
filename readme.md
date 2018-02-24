# handlebars-error-parser

The purpose of this module is to try and parse the compile errors returned from Handlebars so they can be used in handlebars linter(s). Handlebars returns different errors depending the template errors.

Handlebars throws the following types of exceptions:
- parser error - handlebars can't compile the template.
- block error - the open and close block helpers do not match.

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
Outputs:
```js
{
    startLine: 1,
    startColumn: 3,
    endLine: 1,
    endColumn: 4,
    message: 'foo doesn\'t match bar'
}
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