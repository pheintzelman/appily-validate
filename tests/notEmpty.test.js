import { Validator } from '../src/constant.js';
import { validate } from '../src/validate.js';

describe('notEmpty', () => {
  test('should by valid for non empty property', () => {
    const model = { name: 'Tom' };
    const rules = [{ type: Validator.NotEmpty, property: 'name' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid for empty property', () => {
    const model = { name: '' };
    const rules = [
      { type: Validator.NotEmpty, property: 'name', message: 'required' }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: ['required'], valid: false } },
      valid: false
    });
  });

  test('should by invalid for null property', () => {
    const model = { name: null };
    const rules = [
      { type: Validator.NotEmpty, property: 'name', message: 'required' }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: ['required'], valid: false } },
      valid: false
    });
  });

  test('should by invalid for undefined property', () => {
    const model = { name: undefined };
    const rules = [
      { type: Validator.NotEmpty, property: 'name', message: 'required' }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: ['required'], valid: false } },
      valid: false
    });
  });
});
