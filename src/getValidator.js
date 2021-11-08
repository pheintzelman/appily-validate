import { Validator, ValidState } from './constant';
import { notEmptyValidator } from './validators/notEmptyValidator';

const validatorMap = { [Validator.NotEmpty]: notEmptyValidator };

export function getValidator({ type }) {
  if (validatorMap.hasOwnProperty(type)) {
    return validatorMap[type];
  }

  return () => ValidState;
}
