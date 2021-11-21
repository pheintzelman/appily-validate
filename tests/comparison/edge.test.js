import { Validator } from '../..';
import { validate } from '../..';

describe('comparison', () => {
  describe('edge cases', () => {
    test('should throw error for not found operator', () => {
      const model = { password: '87fiJK', confirmPassword: '87fiJK' };
      const rules = [
        {
          type: Validator.Comparison,
          operator: 'spinach',
          property: 'confirmPassword',
          compareTo: 'password',
          message: 'Must match password'
        }
      ];

      expect(() => {
        validate(rules, model);
      }).toThrow('Operator not found');
    });
  });
});
