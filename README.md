# appily-validate

Validate a model based on rules.

Built for appily an application generator but can be used by any project to validate forms or other data.

- Designed to be used in front and backend code.
- No dependencies.
- Supports JSON rules.
- Full model validation allows complex rules.
- Supports internationalization (i18n).

## Getting started

```bash
$npm install appily-validate
```

## How to use

appily-validate exports three things Validator, validate and addValidator

## Validator

is a constants list of all supported validators

```js
import {Validator} from 'appily-validate';

const rules = [{type: Validator.NotEmpty...}]
```

List of supported validators

```js
{ NotEmpty: 'NotEmpty', RegEx: 'RegEx' };
```

## validate

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

### RegEx

Checks if a property matches a regEx, regEx can be a literal or a string

```js
const rules = [
  { type: Validator.RegEx, property: 'name', regEx=/[A-Z][a-z]*/ message: 'Name must start with an uppercase' }
];
```

<i>Message can be a string, object, code or i18n key </i>

### More validators are coming soon

## addValidator

addValidator can be used to add custom validators

addValidator takes a validtor function with this signature

{ property, value, rule, model } => Boolean

Custom validator are global and can be resused throughout your app

```js
import addValidator from 'appily-validate'

//Make your custom validator
function eggStyleValidator({ value }) {
  const styles = [
    'poached',
    'sunny side up',
    'scrambled',
    'over easy',
    'hard boiled'
  ];

  return styles.includes(value.toLowerCase());
}

validateOrder(order) {
  //Register your custom validator
  addValidator('EggStyle', eggStyleValidator);
  const rules = [
    {
      type: 'EggStyle', //use your custom validtor in a rule
      property: 'eggStyle',
      message: 'Not an egg style option'
    }
  ];

  return validate(rules, model);
}
```

## TODO

- Add more validators
  - Comparison (=, <, <=, >=, >, !=)
  - Length
  - Range
  - DateRange
  - Not
  - And
  - Or
  - Min
  - Max
  - Object
  - Array
- Common validators
  - phone
  - email
  - zip
- Throw error on unfound validator
- Add multi rule tests
