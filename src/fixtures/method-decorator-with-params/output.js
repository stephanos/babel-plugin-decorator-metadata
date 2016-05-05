class MyClass {
  @Decorator('A', 42)
  method() {}
}
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'method')
