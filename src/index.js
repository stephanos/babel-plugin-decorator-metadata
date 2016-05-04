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

function extractClassMemberMetadata(t, classPath) {
  const members = [];
  classPath.traverse({
    ClassProperty(path) {
      members.push({ path, kind: 'property' });
    },
    ClassMethod(path) {
      members.push({ path, kind: 'method' });
    },
  });

  members.forEach((member) => {
    const kind = member.kind;
    const target = member.path.node.key.name;
    const decorators = member.path.node.decorators;
    defineDecoratorMetadata(t, classPath, kind, decorators, target);
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
        extractClassMemberMetadata(t, path);
      },
    },
  };
}
