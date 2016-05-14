@Decorator()
class MyClass {
  id;
}

Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass)
export default MyClass;
