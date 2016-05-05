class MyClass {
  @Decorator1()
  @Decorator2()
  method() {}
}

Reflect.defineMetadata("decorator", [{
  type: Decorator1,
  parameters: []
}, {
  type: Decorator2,
  parameters: []
}], MyClass, "method")
export default MyClass;
