@Decorator('param')
class MyClass {}
Reflect.defineMetadata('decorator', [{
  type: Decorator,
  parameters: ['param']
}], MyClass)
