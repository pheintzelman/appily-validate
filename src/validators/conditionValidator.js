import { getValidator } from '../getValidator';
import { isValid } from '../validate';
import { notValidator } from './notValidator';

/**
 * The conditionValidator is:
 * !condition or then
 */
export function conditionValidator({ rule, model }) {
  const { condition, then } = rule;

  if (!condition || !then) {
    return true;
  }

  //short cricut if the condition is not true
  if (!isValid(condition, model)) {
    return true;
  }

  return isValid(then, model);
}
