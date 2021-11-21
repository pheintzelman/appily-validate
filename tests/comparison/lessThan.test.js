import { Validator } from '../..';
import { validate } from '../..';

describe('comparison', () => {
  describe('<', () => {
    test('should by valid for properties', () => {
      const model = { min: 5, max: 7 };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '<',
          property: 'min',
          compareTo: 'max',
          message: 'must less than max'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          min: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by valid for constant', () => {
      const model = { weight: 249 };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '<',
          property: 'weight',
          value: 250,
          message: 'must be less than 250'
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
      const model = { weight: 251 };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'LessThan',
          property: 'weight',
          value: 250,
          message: 'must be less than 250'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          weight: {
            messages: ['must be less than 250'],
            valid: false
          }
        },
        valid: false
      });
    });

    test('should by invalid for not matching properties', () => {
      const model = { min: 17, max: 12 };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'LessThan',
          property: 'min',
          compareTo: 'max',
          message: 'must less than max'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          min: { messages: ['must less than max'], valid: false }
        },
        valid: false
      });
    });
  });
});
