import { Validator } from '../..';
import { validate } from '../..';

describe('comparison', () => {
  describe('>', () => {
    test('should by valid for properties', () => {
      const model = { min: 5, max: 7 };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '>',
          property: 'max',
          compareTo: 'min',
          message: 'must greater than min'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          max: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by valid for constant', () => {
      const model = { weight: 200 };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '>',
          property: 'weight',
          value: 80,
          message: 'must be greater than 80'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          weight: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by invalid for constant', () => {
      const model = { weight: 70 };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'GreaterThan',
          property: 'weight',
          value: 80,
          message: 'must be greater than 80'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          weight: { messages: ['must be greater than 80'], valid: false }
        },
        valid: false
      });
    });

    test('should by invalid for not matching properties', () => {
      const model = { min: 17, max: 12 };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'GreaterThan',
          property: 'max',
          compareTo: 'min',
          message: 'must greater than min'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          max: { messages: ['must greater than min'], valid: false }
        },
        valid: false
      });
    });
  });
});
