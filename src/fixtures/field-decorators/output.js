class MyClass {
  @Decorator1()
  @Decorator2()
  field;
}

Reflect.defineMetadata("decorated", [{
  name: "field",
  kind: "field"
}], MyClass)
Reflect.defineMetadata("decorator", [{
  type: Decorator1,
  parameters: []
}, {
  type: Decorator2,
  parameters: []
}], MyClass, "field")
export default MyClass;
