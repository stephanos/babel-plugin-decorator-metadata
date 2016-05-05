class MyClass {
  @Decorator1()
  @Decorator2()
  get accessor() {}
}

Reflect.defineMetadata("decorator", [{
  type: Decorator1,
  parameters: []
}, {
  type: Decorator2,
  parameters: []
}], MyClass, "accessor")
export default MyClass;
