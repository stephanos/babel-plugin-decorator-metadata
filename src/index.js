/* eslint no-param-reassign:0 */

function extractClassMetadata(t, classPath) {
  const decoratorPaths = [];
  classPath.traverse({
    Decorator(decoratorPath) {
      decoratorPaths.push(decoratorPath);
    },
  });

  decoratorPaths.forEach((decoratorPath) => {
    const decoratorExpr = decoratorPath.node.expression;
    const decoratorName = decoratorExpr.callee.name;
    classPath.insertAfter(
      t.callExpression(
        t.memberExpression(
          t.identifier('Reflect'),
          t.identifier('defineMetadata')
        ),
        [
          t.stringLiteral('decorator:class'),
          t.objectExpression([
            t.objectProperty(t.identifier('type'),
              t.identifier(decoratorName)),
            t.objectProperty(t.identifier('parameters'),
              t.arrayExpression(decoratorExpr.arguments)),
          ]),
          classPath.node.id,
        ]
      )
    );
  });
}

export default function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        extractClassMetadata(t, path);
        // extractFieldsMetadata
      },
    },
  };
}
