# babel-plugin-decorator-metadata [![Build Status](https://travis-ci.org/stephanos/babel-plugin-decorator-metadata.svg)](https://travis-ci.org/stephanos/babel-plugin-decorator-metadata) [![Coverage Status](https://coveralls.io/repos/stephanos/babel-plugin-decorator-metadata/badge.svg?branch=master&service=github)](https://coveralls.io/github/stephanos/babel-plugin-decorator-metadata?branch=master)


This plugin generates code to define
[metadata](https://github.com/rbuckton/ReflectDecorators)
for
[decorators](https://github.com/wycats/javascript-decorators).


## Usage

If you run the plugin on the following input

```js
@ClassDecorator('name')
class MyClass {
  @FieldDecorator()
  field;

  @MethodDecorator()
  method() {
  }
}
```

it will modify the file to look like this:

```js
@ClassDecorator('name')
class MyClass {
   /* ... */
}

Reflect.defineMetadata('decorator', [{
  type: ClassDecorator,
  parameters: ['name']
}], MyClass);
Reflect.defineMetadata('decorator', [{
  type: FieldDecorator,
  parameters: []
}], MyClass, 'field');
Reflect.defineMetadata('decorator', [{
  type: MethodDecorator,
  parameters: []
}], MyClass, 'method');
```

Since the reflection API is still just a proposal at this time,
you'll need a polyfill like [core-js](https://github.com/zloirock/core-js).

Then you can query the metadata:

```js
const classMD = Reflect.getMetadata('decorator', MyClass);
  // { type: ClassDecorator, parameters: ['name'] }
const methodMD = Reflect.getMetadata('decorator', MyClass, 'method');
  // { type: MethodDecorator, parameters: [] }
```


## Get Started

Install the plugin:

```
npm install babel-plugin-decorator-metadata --save-dev
```

And add the additional step to your `.babelrc`:

```js
{
  "plugins": [
    "babel-plugin-syntax-decorators",
    "babel-plugin-decorator-metadata"
  ]
}
```

**Important:** Make sure to load the required polyfill
(like `core-js/es7/reflect` from [core-js](https://github.com/zloirock/core-js))
*before* you load any decorated class
since they all require the global `Reflect` object.
