import { Validator } from '..';
import { validate } from '..';

describe('regEx', () => {
  test('should by valid for passing regEx literal', () => {
    const model = { name: 'Tom' };
    const rules = [{ type: Validator.RegEx, property: 'name', regEx: /T.*/ }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by valid for passing regEx string', () => {
    const model = { name: 'Tom' };
    const rules = [{ type: Validator.RegEx, property: 'name', regEx: '.*m' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should by invalid for patial match', () => {
    const model = { name: 'Tomas' };
    const rules = [{ type: Validator.RegEx, property: 'name', regEx: '.*m' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: false } },
      valid: false
    });
  });

  test('should by valid when regex includes ^ and $', () => {
    const model = { name: 'Tom' };
    const rules = [{ type: Validator.RegEx, property: 'name', regEx: '^.*m$' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { name: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should include message', () => {
    const model = { name: 'tom' };
    const rules = [
      {
        type: Validator.RegEx,
        property: 'name',
        regEx: /[A-Z][a-z]*/,
        message: 'Name must start with an uppercase'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        name: { messages: ['Name must start with an uppercase'], valid: false }
      },
      valid: false
    });
  });

  /**
   * Edge Cases
   */
  test('should handle undefined regex', () => {
    const model = { name: 'tom' };
    const rules = [
      {
        type: Validator.RegEx,
        property: 'name'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        name: { messages: [], valid: true }
      },
      valid: true
    });
  });

  test('should handle undefined value', () => {
    const rules = [
      {
        type: Validator.RegEx,
        property: 'name',
        regEx: '[A-Z][a-z]*'
      }
    ];

    expect(validate(rules, {})).toStrictEqual({
      properties: {
        name: { messages: [], valid: false }
      },
      valid: false
    });
  });
});
