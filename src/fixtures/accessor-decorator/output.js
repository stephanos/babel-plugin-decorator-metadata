class MyClass {
  @Decorator()
  get accessor() {}
}
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "accessor")
