import { isEmptyArray } from '../../util';
import { isValid } from '../../validate';

export function orValidator({ rule, model }) {
  const { rules } = rule;

  if (!rules || isEmptyArray(rules)) {
    return true;
  }

  return rules.reduce((valid, rule, _, array) => {
    //short cricut
    if (valid) {
      array.splice(1);
    }

    return valid || isValid(rule, model);
  }, false);
}
