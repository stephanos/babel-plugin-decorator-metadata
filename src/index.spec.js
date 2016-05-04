import fs from 'fs';
import path from 'path';
import assert from 'assert';
import plugin from './index';
import { transform } from 'babel-core';


const REQUIRED_PLUGINS = [
  'babel-plugin-syntax-flow',
  'babel-plugin-syntax-decorators',
  'babel-plugin-syntax-class-properties',
];

function transpile(input, pluginOpts = {}) {
  const plugins = REQUIRED_PLUGINS.slice();
  plugins.push([plugin, pluginOpts]);
  const options = { plugins };
  return transform(input, options).code;
}

function testFixture(dir, pluginOpts = {}) {
  const fixtureDir = path.join(__dirname, 'fixtures', dir);
  const actual = transpile(fs.readFileSync(path.join(fixtureDir, 'input.js'), 'utf8'), pluginOpts);
  const expected = fs.readFileSync(path.join(fixtureDir, 'output.js'), 'utf8');
  assert.equal(actual.trim(), expected.trim());
}


describe('applying transformer to', () => {
  describe('a decorated class', () => {
    describe('without decorator parameters', () => {
      it('should define metadata', () => {
        testFixture('class-decorator');
      });
    });

    describe('with a decorator parameter', () => {
      it('should define metadata', () => {
        testFixture('class-decorator-with-param');
      });
    });

    describe('with multiple decorator parameters', () => {
      it('should define metadata', () => {
        testFixture('class-decorator-with-params');
      });
    });
  });

  describe('a class with a decorated field', () => {
    describe('with a decorator', () => {
      describe('without parameters', () => {
        it('should define metadata', () => {
          testFixture('field-decorator');
        });
      });
    });

    describe('with multiple decorators', () => {
      describe('without parameters', () => {
        it('should define metadata', () => {
          testFixture('field-decorators');
        });
      });

      describe('with parameters', () => {
        it('should define metadata', () => {
          testFixture('field-decorators-with-params');
        });
      });
    });
  });

  describe('a non-decorated class', () => {
    it('should not modify the input', () => {
      testFixture('non-decorated');
    });
  });
});
