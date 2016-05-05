class MyClass {
  @Decorator1('A', true)
  @Decorator2('B', false)
  field;
}

Reflect.defineMetadata('decorator', [{
  type: Decorator1,
  parameters: ['A', true]
}, {
  type: Decorator2,
  parameters: ['B', false]
}], MyClass, 'field')
export default MyClass;
