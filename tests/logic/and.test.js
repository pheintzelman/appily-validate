import { Validator } from '../..';
import { validate } from '../..';

describe('and', () => {
  test('should by valid', () => {
    const model = { age: 30 };
    const rules = [
      {
        type: Validator.And,
        property: 'age',
        message: 'must be between 0 and 120',
        rules: [
          { type: Validator.Comparison, op: '>', property: 'age', value: 0 },
          { type: Validator.Comparison, op: '<', property: 'age', value: 120 }
        ]
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { age: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid', () => {
    const model = { age: -10 };
    const rules = [
      {
        type: Validator.And,
        property: 'age',
        message: 'must be between 0 and 120',
        rules: [
          { type: Validator.Comparison, op: '>', property: 'age', value: 0 },
          { type: Validator.Comparison, op: '<', property: 'age', value: 120 }
        ]
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        age: { messages: ['must be between 0 and 120'], valid: false }
      },
      valid: false
    });
  });

  /**
   * Edge Cases
   */
  test('should by valid for no rules', () => {
    const model = { age: -10 };
    const rules = [
      {
        type: Validator.And,
        property: 'age',
        message: 'must be between 0 and 120'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        age: { messages: [], valid: true }
      },
      valid: true
    });
  });

  test('should by valid for empty rules', () => {
    const model = { age: -10 };
    const rules = [
      {
        type: Validator.And,
        property: 'age',
        message: 'must be between 0 and 120',
        rules: []
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        age: { messages: [], valid: true }
      },
      valid: true
    });
  });
});
