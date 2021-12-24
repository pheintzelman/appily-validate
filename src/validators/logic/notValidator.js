import { isValid } from '../../validate';

export function notValidator({ rule, model }) {
  const { rule: innerRule } = rule;

  if (!innerRule) {
    return true;
  }

  const valid = isValid(innerRule, model);
  return !valid;
}
