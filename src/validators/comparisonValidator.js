import { ComparisonOperator } from '../constant';

const Operator = {
  Equal: (a, b) => a === b,
  NotEqual: (a, b) => a !== b,
  GreaterThan: (a, b) => typeof a == typeof b && a > b,
  GreaterThanOrEqual: (a, b) => typeof a == typeof b && a >= b,
  LessThan: (a, b) => typeof a == typeof b && a < b,
  LessThanOrEqual: (a, b) => typeof a == typeof b && a <= b
};

const OperatorMap = {
  [ComparisonOperator.Equal]: Operator.Equal,
  '=': Operator.Equal,
  '===': Operator.Equal,
  equal: Operator.Equal,
  equals: Operator.Equal,
  [ComparisonOperator.NotEqual]: Operator.NotEqual,
  notequal: Operator.NotEqual,
  notequals: Operator.NotEqual,
  '!==': Operator.NotEqual,
  [ComparisonOperator.GreaterThan]: Operator.GreaterThan,
  greaterthan: Operator.GreaterThan,
  [ComparisonOperator.GreaterThanOrEqual]: Operator.GreaterThanOrEqual,
  greaterthanorequal: Operator.GreaterThanOrEqual,
  [ComparisonOperator.LessThan]: Operator.LessThan,
  lessthan: Operator.LessThan,
  [ComparisonOperator.LessThanOrEqual]: Operator.LessThanOrEqual,
  lessthanorequal: Operator.LessThanOrEqual
};

function getOperator(rule) {
  const { operator, op } = rule;
  const operatorName = operator ?? op;
  const key = operatorName?.toLowerCase();

  if (!OperatorMap.hasOwnProperty(key)) {
    throw new Error('Operator not found');
  }

  return OperatorMap[key];
}

function getCompareToValue({ rule, model }) {
  const { compareTo, value } = rule;
  if (compareTo) {
    return model[compareTo];
  }

  return value;
}

export function comparisonValidator({ value, rule, model }) {
  const compareToValue = getCompareToValue({ rule, model });
  const operator = getOperator(rule);

  return operator(value, compareToValue);
}
