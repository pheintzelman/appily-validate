import { Validator } from '../..';
import { validate } from '../..';

describe('or', () => {
  test('should by valid', () => {
    const model = { order: 'chicken' };
    const rules = [
      {
        type: Validator.Or,
        property: 'order',
        message: 'must be chicken, beef or veggie',
        rules: [
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'chicken'
          },
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'beef'
          },
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'veggie'
          }
        ]
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { order: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid', () => {
    const model = { order: 'pork' };
    const rules = [
      {
        type: Validator.Or,
        property: 'order',
        message: 'must be chicken, beef or veggie',
        rules: [
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'chicken'
          },
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'beef'
          },
          {
            type: Validator.Comparison,
            op: '==',
            property: 'order',
            value: 'veggie'
          }
        ]
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        order: { messages: ['must be chicken, beef or veggie'], valid: false }
      },
      valid: false
    });
  });

  /**
   * Edge Cases
   */
  test('should by valid for no rules', () => {
    const model = { order: 10 };
    const rules = [
      {
        type: Validator.Or,
        property: 'order',
        message: 'must be chicken, beef or veggie'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        order: { messages: [], valid: true }
      },
      valid: true
    });
  });

  test('should by valid for empty rules', () => {
    const model = { order: 10 };
    const rules = [
      {
        type: Validator.Or,
        property: 'order',
        message: 'must be chicken, beef or veggie',
        rules: []
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        order: { messages: [], valid: true }
      },
      valid: true
    });
  });
});
