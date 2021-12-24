export function lengthValidator({ value, rule }) {
  const { is } = rule;

  const min = is !== undefined ? is : rule.min;
  const max = is !== undefined ? is : rule.max;

  if (min === undefined && max === undefined) {
    return true;
  }

  if (!value.length) {
    return false;
  }

  if (max !== undefined && max < value.length) {
    return false;
  }

  if (min !== undefined && min > value.length) {
    return false;
  }

  return true;
}
