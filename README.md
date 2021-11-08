# appily-validate

Validate a model based on rules.

Built for appily an application generator but can be used by any project to validate forms or other data.

Designed to be used in front and backend code.

## Getting started

```bash
$npm install appily-validate
```

## How to use

appily-validate exports two things validate Validator

### Validator

is a list of all supported validators

```js
import {Validator} from 'appily-validate';

const rules = [{type: Validator.NotEmpty...}]
```

### validate

validates a javascript object given a set of rules

```js
import { validate, Validator } from 'appily-validate';

const rules = [
  { type: Validator.NotEmpty, property: 'name', message: 'required' }
];
const results = validate(rules, { color: 'red' });

/*
results = { 
  valid: false, 
  properties: { 
    name: { 
      valid: false, messages: ['required']
    }
  }
}
*/
```

### NotEmpty

Checks if a property on the given object is not empty

```js
const rules = [
  { type: Validator.NotEmpty, property: 'name', message: 'required' }
];
```

<i>Message can be a string, object, code or i18n key </i>

### More validators are coming soon

## TODO

- Add more validators
  - Regex
  - Comparison (=, <, <=, >=, >, !=)
  - Length
  - Range
  - Not
  - And
  - Or
- Custom validators
- Common validators
  - phone
  - email
  - zip
