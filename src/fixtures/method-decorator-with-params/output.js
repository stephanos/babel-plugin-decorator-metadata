class MyClass {
  @Decorator('A', 42)
  method() {}
}

Reflect.defineMetadata('decorated', ['method'], MyClass)
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'method')
export default MyClass;
