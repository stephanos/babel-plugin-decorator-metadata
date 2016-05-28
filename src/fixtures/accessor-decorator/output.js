class MyClass {
  @Decorator()
  get accessor() {}
}

Reflect.defineMetadata("decorated", ["accessor"], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "accessor")
export default MyClass;
