class MyClass {
  @Decorator('A', 42)
  get accessor() {}
}

Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'accessor')
export default MyClass;
