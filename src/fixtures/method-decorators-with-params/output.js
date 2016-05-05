class MyClass {
  @Decorator1('A', 42)
  @Decorator2('B', false)
  method() {}
}
Reflect.defineMetadata('decorator', [{
  type: Decorator1,
  parameters: ['A', 42]
}, {
  type: Decorator2,
  parameters: ['B', false]
}], MyClass, 'method')
