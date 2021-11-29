import { isValid } from '../validate';

export function andValidator({ rule, model }) {
  const { rules } = rule;

  if (!rules) {
    return true;
  }

  return rules.reduce((valid, rule, _, array) => {
    //short cricut
    if (!valid) {
      array.splice(1);
    }

    return valid && isValid(rule, model);
  }, true);
}
