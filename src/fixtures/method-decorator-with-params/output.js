class MyClass {
  @Decorator('A', 42)
  method() {}
}

Reflect.defineMetadata('decorated', [{
  name: 'method',
  kind: 'method'
}], MyClass)
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'method')
export default MyClass;
