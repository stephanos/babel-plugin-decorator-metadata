@Decorator()
class MyClass {
  @Decorator()
  field;

  @Decorator()
  method() {}

  @Decorator()
  get accessor() {}

  @Decorator()
  set accessor(val) {}
}

Reflect.defineMetadata("decorated", ["field", "method", "accessor", "accessor"], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "accessor")
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "accessor")
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "method")
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "field")
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass)
export default MyClass;
