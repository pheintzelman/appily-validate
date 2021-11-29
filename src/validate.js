import { getValidator } from './getValidator.js';

function mergeState(propertyState1, propertyState2) {
  if (!propertyState1) {
    return propertyState2;
  }

  return {
    valid: propertyState1.valid && propertyState2.valid,
    messages: [...propertyState1.messages, ...propertyState2.messages]
  };
}

export function isValid(rule, model) {
  const { property } = rule;
  const value = model[property];

  const validator = getValidator(rule);
  const valid = validator({ property, value, rule, model });

  return valid;
}

function validateRule({ rule, model }) {
  const { property, message } = rule;

  const valid = isValid(rule, model);
  const messages = valid || message === undefined ? [] : [message];

  return [property, { valid, messages }];
}

export function validate(rules, model) {
  return rules.reduce(
    (state, rule) => {
      const [property, propertyState] = validateRule({ rule, model });
      return {
        valid: state.valid && propertyState.valid,
        properties: {
          ...state.properties,
          [property]: mergeState(state.properties[property], propertyState)
        }
      };
    },
    { valid: true, properties: {} }
  );
}
