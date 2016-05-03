@Decorator('param')
class MyClass {}
Reflect.defineMetadata('decorator:class', {
  type: Decorator,
  parameters: ['param']
}, MyClass)
