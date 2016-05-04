class MyClass {
  @Decorator()
  method() {}
}
Reflect.defineMetadata("decorator:method", [{
  type: Decorator,
  parameters: []
}], MyClass, "method")
