class MyClass {
  @Decorator()
  field;
}
Reflect.defineMetadata("decorator:property", [{
  type: Decorator,
  parameters: []
}], MyClass, "field")
