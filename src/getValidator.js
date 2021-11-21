import { Validator } from './constant.js';
import { comparisonValidator } from './validators/comparisonValidator.js';
import { notEmptyValidator } from './validators/notEmptyValidator.js';
import { regExValidator } from './validators/regExValidator.js';

const validatorMap = {
  [Validator.NotEmpty]: notEmptyValidator,
  [Validator.RegEx]: regExValidator,
  [Validator.Comparison]: comparisonValidator
};

export function addValidator(name, validator) {
  if (Validator.hasOwnProperty(name)) {
    throw new Error('Validator name is reserved');
  }

  validatorMap[name] = validator;
  return true;
}

export function getValidator({ type }) {
  if (validatorMap.hasOwnProperty(type)) {
    return validatorMap[type];
  }

  return () => true;
}
