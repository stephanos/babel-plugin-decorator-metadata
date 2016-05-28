class MyClass {
  @Decorator()
  method() {}
}

Reflect.defineMetadata("decorated", ["method"], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "method")
export default MyClass;
