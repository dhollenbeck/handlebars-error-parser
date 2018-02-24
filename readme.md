# handlebars-error-parser

The purpose of this module is to try and parse the compile errors returned from Handlebars so they can be used in handlebars linter. Handlebars returns different errors depending the template errors.

# Mismatched: block helpers

```hbs
{{#foo}}{{/bar}}
```
```text
foo doesn't match bar - 1:3
```

# Mismatached: closing helpler
```hbs
{{foo}}{{/foo}}
```
```text
Parse error on line 1:
{{foo}}{{/foo}}
-------^
Expecting 'EOF', got 'OPEN_ENDBLOCK'
```
# Missing helper or variable closing

```hbs
{{foo
```
```text
Parse error on line 1:
{{foo
--^
Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'INVALID'
```

# Missing block helper closing

```hbs
{{#foo
```
```text
Parse error on line 1:
{{#foo
---^
Expecting 'ID', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', got 'INVALID'
```