function defineDecoratorMetadata(t, classPath, kind, decorators, target) {
  const descriptors = [];

  decorators.forEach((decorator) => {
    const decoratorExpr = decorator.expression;
    const name = decoratorExpr.callee.name;
    const args = decoratorExpr.arguments;

    descriptors.push(
      t.objectExpression([
        t.objectProperty(t.identifier('type'),
          t.identifier(name)),
        t.objectProperty(t.identifier('parameters'),
          t.arrayExpression(args)),
      ])
    );
  });

  const reflectArgs = [
    t.stringLiteral(`decorator:${kind}`),
    t.arrayExpression(descriptors),
    classPath.node.id,
  ];
  if (target) {
    reflectArgs.push(t.stringLiteral(target));
  }

  return classPath.insertAfter(
    t.callExpression(
      t.memberExpression(
        t.identifier('Reflect'), t.identifier('defineMetadata')
      ), reflectArgs
    )
  );
}

function extractFieldsMetadata(t, classPath) {
  const propertyPaths = [];
  classPath.traverse({
    ClassProperty(path) {
      propertyPaths.push(path);
    },
  });

  propertyPaths.forEach((propertyPath) => {
    const target = propertyPath.node.key.name;
    const decorators = propertyPath.node.decorators;
    defineDecoratorMetadata(t, classPath, 'field', decorators, target);
  });
}

function extractClassMetadata(t, classPath) {
  const decorators = classPath.node.decorators;
  if (!decorators) {
    return;
  }

  defineDecoratorMetadata(t, classPath, 'class', decorators);
}

export default function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        extractClassMetadata(t, path);
        extractFieldsMetadata(t, path);
      },
    },
  };
}
