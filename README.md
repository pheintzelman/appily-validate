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

Validators:

- [NotEmpty](#notempty)
- [RegEx](#regex)
- [Comparison](#comparison)
- [And](#and)
- [Or](#or)
- [Not](#not)
- [Condition](#condition)
- [Custom](#custom-validators)

## Validators

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

### Comparison (=, <, <=, >=, >, !=)

Compares a property to another property or constant value

```js
const rules = const rules = [
  {
    type: Validator.Comparison,
    operator: '==',
    property: 'confirmPassword',
    compareTo: 'password',
    message: 'Must match password'
  },
  {
    type: Validator.Comparison,
    op: '<',
    property: 'weight',
    value: 250,
    message: 'must be less than 250'
  }
];
```

Supported operators are: =, <, <=, >=, >, !=

<i>Message can be a string, object, code or i18n key </i>

### And

Is true if all rules are true.

```js
const rules = [
  {
    type: Validator.And,
    property: 'age',
    message: 'must be between 0 and 120',
    rules: [
      { type: Validator.Comparison, op: '>', property: 'age', value: 0 },
      { type: Validator.Comparison, op: '<', property: 'age', value: 120 }
    ]
  }
];
```

- rules: can use any validator
  - messages in inner rules are ignored
- message: can be a string, object, code or i18n key

### Or

Is true if one of the rules is true.

```js
const rules = [
  {
    type: Validator.Or,
    property: 'order',
    message: 'must be chicken, beef or veggie',
    rules: [
      {
        type: Validator.Comparison,
        op: '==',
        property: 'order',
        value: 'chicken'
      },
      {
        type: Validator.Comparison,
        op: '==',
        property: 'order',
        value: 'beef'
      },
      {
        type: Validator.Comparison,
        op: '==',
        property: 'order',
        value: 'veggie'
      }
    ]
  }
];
```

- rules: can use any validator
  - messages in inner rules are ignored
- message: can be a string, object, code or i18n key

### Not

Is true if rule is false.

```js
const rules = [
  {
    type: Validator.Not,
    property: 'name',
    message: 'must not be Steve',
    rule: {
      type: Validator.Comparison,
      op: '==',
      property: 'name',
      value: 'Steve'
    }
  }
];
```

- rule: can use any validator
  - the message in the inner rule is ignored
- message: can be a string, object, code or i18n key

### Condition

Is the results of then if the condition is true

```js
const rules = [
  {
    type: Validator.Condition,
    property: 'hasCarInsurance',
    message: 'required',
    condition: {
      type: Validator.Comparison,
      op: '==',
      property: 'ownsCar',
      value: true
    },
    then: {
      type: Validator.Comparison,
      op: '==',
      property: 'hasCarInsurance',
      value: true
    }
  }
];
```

- condition: can use any validator
  - the message in the inner rule is ignored
- then: can use any validator
  - the message in the inner rule is ignored
- message: can be a string, object, code or i18n key

### More validators are coming soon

## Custom Validators

addValidator can be used to add custom validators

addValidator takes a validator function with this signature

{ property, value, rule, model } => Boolean

Custom validators are global and can be resused throughout your app

```js
import {addValidator, validate} from 'appily-validate'

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
  - Contains
- Common regex
  - phone
  - email
  - zip
- Throw error on unfound validator
- Add multi rule tests
- Add global rules
