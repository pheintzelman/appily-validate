import { Validator } from '../..';
import { validate } from '../..';

describe('comparison', () => {
  describe('!=', () => {
    test('should by valid for not matching properties', () => {
      const model = { password: '87fiJK', username: 'HamsterDance' };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '!=',
          property: 'password',
          compareTo: 'username',
          message: 'Must not be username'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          password: { messages: [], valid: true }
        },
        valid: true
      });
    });

    test('should by valid for constant', () => {
      const model = { favoriteFood: 'tacos' };
      const rules = [
        {
          type: Validator.Comparison,
          operator: '!==',
          property: 'favoriteFood',
          value: 'armpit sweat',
          message: 'must not be armpit sweat'
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
      const model = { favoriteFood: 'armpit sweat' };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'NotEquals',
          property: 'favoriteFood',
          value: 'armpit sweat',
          message: 'must not be armpit sweat'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          favoriteFood: { messages: ['must not be armpit sweat'], valid: false }
        },
        valid: false
      });
    });

    test('should by invalid for not matching properties', () => {
      const model = { password: 'HamsterDance', username: 'HamsterDance' };
      const rules = [
        {
          type: Validator.Comparison,
          op: 'NotEqual',
          property: 'password',
          compareTo: 'username',
          message: 'Must not be username'
        }
      ];

      expect(validate(rules, model)).toStrictEqual({
        properties: {
          password: { messages: ['Must not be username'], valid: false }
        },
        valid: false
      });
    });
  });
});
