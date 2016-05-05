/* eslint global-require:0 */

import path from 'path';
import assert from 'assert';

function load(dir) {
  return require(path.join(__dirname, 'fixtures', dir, 'output.es6.js'));
}

describe('query decorator metadata', () => {
  global.Decorator = () => () => {};

  describe('of a class', () => {
    it('should return metadata', () => {
      const MyClass = load('class-decorator-with-params').default;

      assert.deepEqual(Reflect.getOwnMetadata('decorator', MyClass), [{
        parameters: ['param', 2, true],
        type: global.Decorator,
      }]);
    });
  });

  describe('of a method', () => {
    it('should return metadata', () => {
      const MyClass = load('method-decorator-with-params').default;

      assert.deepEqual(Reflect.getOwnMetadata('decorator', MyClass, 'method'), [{
        parameters: ['A', 42],
        type: global.Decorator,
      }]);
    });
  });

  describe('of a field', () => {
    it('should return metadata', () => {
      const MyClass = load('field-decorator-with-params').default;

      assert.deepEqual(Reflect.getOwnMetadata('decorator', MyClass, 'field'), [{
        parameters: ['A', 42],
        type: global.Decorator,
      }]);
    });
  });

  describe('of an accessor', () => {
    it('should return metadata', () => {
      const MyClass = load('accessor-decorator-with-params').default;

      assert.deepEqual(Reflect.getOwnMetadata('decorator', MyClass, 'accessor'), [{
        parameters: ['A', 42],
        type: global.Decorator,
      }]);
    });
  });
});
