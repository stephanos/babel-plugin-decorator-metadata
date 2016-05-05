class MyClass {
  @Decorator()
  method() {}
}

Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "method")
export default MyClass;
