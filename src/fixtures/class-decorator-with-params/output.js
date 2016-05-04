@Decorator('param', 2, true)
class MyClass {}
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['param', 2, true]
}], MyClass)
