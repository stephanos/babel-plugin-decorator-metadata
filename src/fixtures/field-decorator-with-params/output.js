class MyClass {
  @Decorator('A', 42)
  field;
}
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'field')
