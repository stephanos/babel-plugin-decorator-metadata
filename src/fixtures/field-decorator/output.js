class MyClass {
  @Decorator()
  field;
}

Reflect.defineMetadata("decorated", [{
  name: "field",
  kind: "field"
}], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator,
  parameters: []
}], MyClass, "field")
export default MyClass;
