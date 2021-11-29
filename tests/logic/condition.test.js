import { Validator } from '../..';
import { validate } from '../..';

describe('condition', () => {
  test('should by valid with false condition', () => {
    const model = { ownsCar: false, hasCarInsurance: undefined };
    const rules = [
      {
        type: Validator.Condition,
        property: 'hasCarInsurance',
        message: 'required',
        condition: {
          type: Validator.Comparison,
          op: '==',
          property: 'ownsCar',
          value: true
        },
        then: {
          type: Validator.Comparison,
          op: '==',
          property: 'hasCarInsurance',
          value: true
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        hasCarInsurance: { messages: [], valid: true }
      },
      valid: true
    });
  });

  test('should by valid with true condition', () => {
    const model = { ownsCar: true, hasCarInsurance: true };
    const rules = [
      {
        type: Validator.Condition,
        property: 'hasCarInsurance',
        message: 'required',
        condition: {
          type: Validator.Comparison,
          op: '==',
          property: 'ownsCar',
          value: true
        },
        then: {
          type: Validator.Comparison,
          op: '==',
          property: 'hasCarInsurance',
          value: true
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        hasCarInsurance: { messages: [], valid: true }
      },
      valid: true
    });
  });

  test('should by invalid with true condition', () => {
    const model = { ownsCar: true, hasCarInsurance: undefined };
    const rules = [
      {
        type: Validator.Condition,
        property: 'hasCarInsurance',
        message: 'required',
        condition: {
          type: Validator.Comparison,
          op: '==',
          property: 'ownsCar',
          value: true
        },
        then: {
          type: Validator.Comparison,
          op: '==',
          property: 'hasCarInsurance',
          value: true
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        hasCarInsurance: { messages: ['required'], valid: false }
      },
      valid: false
    });
  });

  /**
   * Edge Cases
   */
  test('should by valid with missing condition', () => {
    const model = { ownsCar: true, hasCarInsurance: undefined };
    const rules = [
      {
        type: Validator.Condition,
        property: 'hasCarInsurance',
        message: 'required',
        then: {
          type: Validator.Comparison,
          op: '==',
          property: 'hasCarInsurance',
          value: true
        }
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        hasCarInsurance: { messages: [], valid: true }
      },
      valid: true
    });
  });
});
