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

  const decoratedTargets = [];
  members.forEach((member) => {
    if (member.node.kind === 'get' || member.node.kind === 'set') {
      return;
    }

    const target = member.node.key.name;
    const decorators = member.node.decorators;
    if (decorators) {
      defineDecoratorMetadata(t, classPath, decorators, target);
      decoratedTargets.push(target);
    }
  });

  if (decoratedTargets.length) {
    classPath.insertAfter(
      t.callExpression(
        t.memberExpression(
          t.identifier('Reflect'), t.identifier('defineMetadata')
        ), [
          t.stringLiteral('decorated'),
          t.arrayExpression(decoratedTargets.map((d) => t.stringLiteral(d))),
          classPath.node.id,
        ]
      )
    );
  }
}

function extractClassMetadata(t, classPath) {
  const decorators = classPath.node.decorators;
  if (decorators) {
    defineDecoratorMetadata(t, classPath, decorators);
  }
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
