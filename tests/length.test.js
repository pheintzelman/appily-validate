import { Validator } from '..';
import { validate } from '..';

describe('length', () => {
  test('should by valid for min', () => {
    const model = { name: 'Tom' };
    const rules = [{ type: Validator.Length, property: 'name', min: 3 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by valid for max', () => {
    const model = { zip: '12345' };
    const rules = [{ type: Validator.Length, property: 'zip', max: 5 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by valid for min and max', () => {
    const model = { zip: '12345' };
    const rules = [{ type: Validator.Length, property: 'zip', max: 5, min: 5 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by valid for is', () => {
    const model = { zip: '12345' };
    const rules = [{ type: Validator.Length, property: 'zip', is: 5 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid for min', () => {
    const model = { name: 'To' };
    const rules = [
      {
        type: Validator.Length,
        property: 'name',
        min: 3,
        message: 'must be at least 3 chars'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        name: { messages: ['must be at least 3 chars'], valid: false }
      },
      valid: false
    });
  });

  test('should by invalid for max', () => {
    const model = { zip: '123456' };
    const rules = [
      {
        type: Validator.Length,
        message: 'should be 5 digits',
        property: 'zip',
        max: 5
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: ['should be 5 digits'], valid: false } },
      valid: false
    });
  });

  test('should by valid for min and max', () => {
    const model = { zip: '12345' };
    const rules = [
      {
        type: Validator.Length,
        message: 'should be 5 digits',
        property: 'zip',
        max: 5,
        min: 5
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by valid for is', () => {
    const model = { zip: '12345' };
    const rules = [{ type: Validator.Length, property: 'zip', is: 5 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  /**
   * Edge Cases
   */
  test('should by valid for no min/max', () => {
    const model = { zip: '12345' };
    const rules = [{ type: Validator.Length, property: 'zip' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid when value has for no length', () => {
    const model = { zip: 12345 };
    const rules = [{ type: Validator.Length, property: 'zip', max: 5, min: 5 }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { zip: { messages: [], valid: false } },
      valid: false
    });
  });
});
