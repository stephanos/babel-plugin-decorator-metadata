@Decorator()
class MyClass {}
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass)
