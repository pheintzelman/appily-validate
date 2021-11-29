import { isValid } from '../validate';

export function notValidator({ rule, model }) {
  const { rule: subRule } = rule;

  if (!subRule) {
    return true;
  }

  const valid = isValid(subRule, model);
  return !valid;
}
