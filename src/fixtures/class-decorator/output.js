@Decorator()
class MyClass {}
Reflect.defineMetadata("decorator:class", {
  type: Decorator,
  parameters: []
}, MyClass)
