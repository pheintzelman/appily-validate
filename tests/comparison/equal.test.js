import { Validator } from '../..';
import { validate } from '../..';

describe('comparison', () => {
  describe('==', () => {
    test('should by valid for matching properties', () => {
      const model = { password: '87fiJK', confirmPassword: '87fiJK' };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '==',
          property: 'confirmPassword',
          compareTo: 'password',
          message: 'Must match password'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          confirmPassword: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by valid for constant', () => {
      const model = { favoriteFood: 'tacos' };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '===',
          property: 'favoriteFood',
          value: 'tacos',
          message: 'must be tacos'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          favoriteFood: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by invalid for constant', () => {
      const model = { favoriteFood: 'kale' };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'equals',
          property: 'favoriteFood',
          value: 'tacos',
          message: 'must be tacos'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          favoriteFood: { messages: ['must be tacos'], valid: false }
        },
        valid: false
      });
    });

    test('should by invalid for not matching properties', () => {
      const model = { password: '87fiJK', confirmPassword: '87fiJL' };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'Equal',
          property: 'confirmPassword',
          compareTo: 'password',
          message: 'Must match password'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          confirmPassword: { messages: ['Must match password'], valid: false }
        },
        valid: false
      });
    });
  });
});
