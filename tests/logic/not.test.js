import { Validator } from '../..';
import { validate } from '../..';

describe('not', () => {
  test('should by valid', () => {
    const model = { name: 'Gale' };
    const rules = [
      {
        type: Validator.Not,
        property: 'name',
        message: 'must not be Steve',
        rule: {
          type: Validator.Comparison,
          op: '==',
          property: 'name',
          value: 'Steve'
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid', () => {
    const model = { name: 'Steve' };
    const rules = [
      {
        type: Validator.Not,
        property: 'name',
        message: 'must not be Steve',
        rule: {
          type: Validator.Comparison,
          op: '==',
          property: 'name',
          value: 'Steve'
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: ['must not be Steve'], valid: false } },
      valid: false
    });
  });

  /**
   * Edge Cases
   */
  test('should by valid for no rule', () => {
    const model = { name: -10 };
    const rules = [
      {
        type: Validator.Not,
        property: 'name',
        message: 'must not be Steve'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        name: { messages: [], valid: true }
      },
      valid: true
    });
  });
});
