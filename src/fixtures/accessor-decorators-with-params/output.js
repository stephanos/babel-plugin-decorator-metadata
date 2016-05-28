class MyClass {
  @Decorator1('A', 42)
  @Decorator2('B', true)
  get accessor() {}
}

Reflect.defineMetadata('decorated', ['accessor'], MyClass)
Reflect.defineMetadata('decorator', [{
  type: Decorator1,
  parameters: ['A', 42]
}, {
  type: Decorator2,
  parameters: ['B', true]
}], MyClass, 'accessor')
export default MyClass;
