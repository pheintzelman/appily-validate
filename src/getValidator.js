import { Validator } from './constant.js';

import { andValidator } from './validators/logic/andValidator.js';
import { comparisonValidator } from './validators/comparisonValidator.js';
import { conditionValidator } from './validators/logic/conditionValidator.js';
import { lengthValidator } from './validators/lengthValidator.js';
import { notValidator } from './validators/logic/notValidator.js';
import { notEmptyValidator } from './validators/notEmptyValidator.js';
import { orValidator } from './validators/logic/orValidator.js';
import { regExValidator } from './validators/regExValidator.js';

const validatorMap = {
  [Validator.And]: andValidator,
  [Validator.Comparison]: comparisonValidator,
  [Validator.Condition]: conditionValidator,
  [Validator.Length]: lengthValidator,
  [Validator.Not]: notValidator,
  [Validator.NotEmpty]: notEmptyValidator,
  [Validator.RegEx]: regExValidator,
  [Validator.Or]: orValidator
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
