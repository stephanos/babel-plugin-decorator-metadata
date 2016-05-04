function defineDecoratorMetadata(t, classPath, decorators, target) {
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
    t.stringLiteral('decorator'),
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

function extractClassMemberMetadata(t, classPath) {
  const members = [];
  classPath.traverse({
    ClassProperty(path) {
      members.push(path);
    },
    ClassMethod(path) {
      members.push(path);
    },
  });

  members.forEach((member) => {
    const target = member.node.key.name;
    const decorators = member.node.decorators;
    defineDecoratorMetadata(t, classPath, decorators, target);
  });
}

function extractClassMetadata(t, classPath) {
  const decorators = classPath.node.decorators;
  if (!decorators) {
    return;
  }

  defineDecoratorMetadata(t, classPath, decorators);
}

export default function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        extractClassMetadata(t, path);
        extractClassMemberMetadata(t, path);
      },
    },
  };
}
