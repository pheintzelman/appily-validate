import { Validator, ValidState } from './constant.js';
import { notEmptyValidator } from './validators/notEmptyValidator.js';

const validatorMap = { [Validator.NotEmpty]: notEmptyValidator };

export function getValidator({ type }) {
  if (validatorMap.hasOwnProperty(type)) {
    return validatorMap[type];
  }

  return () => ValidState;
}
