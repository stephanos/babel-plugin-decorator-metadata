class MyClass {
  @Decorator('A', 42)
  get accessor() {}
}

Reflect.defineMetadata('decorated', ['accessor'], MyClass)
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'accessor')
export default MyClass;
