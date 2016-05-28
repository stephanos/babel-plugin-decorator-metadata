class MyClass {
  @Decorator()
  method() {}
}

Reflect.defineMetadata("decorated", [{
  name: "method",
  kind: "method"
}], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "method")
export default MyClass;
