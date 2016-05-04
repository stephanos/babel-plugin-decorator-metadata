class MyClass {
  @Decorator()
  field;
}
Reflect.defineMetadata("decorator:field", [{
  type: Decorator,
  parameters: []
}], MyClass, "field")
