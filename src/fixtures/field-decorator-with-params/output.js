class MyClass {
  @Decorator('A', 42)
  field;
}

Reflect.defineMetadata('decorated', ['field'], MyClass)
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['A', 42]
}], MyClass, 'field')
export default MyClass;
