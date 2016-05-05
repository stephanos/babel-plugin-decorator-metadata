class MyClass {
  @Decorator()
  field;
}

Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "field")
export default MyClass;
