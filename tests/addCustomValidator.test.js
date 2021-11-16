import { validate } from '..';
import { addValidator } from '..';

function eggStyleValidator({ value }) {
  const styles = [
    'poached',
    'sunny side up',
    'scrambled',
    'over easy',
    'hard boiled'
  ];

  return styles.includes(value.toLowerCase());
}

describe('addValidator', () => {
  test('should allow adding custom validator and be valid', () => {
    addValidator('EggStyle', eggStyleValidator);
    const model = { order: 'Over Easy' };
    const rules = [{ type: 'EggStyle', property: 'order' }];

    expect(validate(rules, model)).toStrictEqual({
      properties: { order: { messages: [], valid: true } },
      valid: true
    });
  });

  test('should allow adding custom validator and be invalid', () => {
    addValidator('EggStyle', eggStyleValidator);
    const model = { order: 'cooked' };
    const rules = [
      {
        type: 'EggStyle',
        property: 'order',
        message: 'Not an egg style option'
      }
    ];

    expect(validate(rules, model)).toStrictEqual({
      properties: {
        order: { messages: ['Not an egg style option'], valid: false }
      },
      valid: false
    });
  });

  test('should throw error on name conflict', () => {
    expect(() => {
      addValidator('NotEmpty', () => true);
    }).toThrow('Validator name is reserved');
  });
});
