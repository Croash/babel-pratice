const { declare } = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');
const types = require('@babel/types')

const customedPlugin = declare((api, options, dirname) => {
  api.assertVersion(7)
  const t = api.types

  function checkTrue(node) {
    return [
      ['==', '==='].includes(node.operator) && node.right.value === true,
    ].reduce((a,b) => a || b, false)
  }


  return {
    pre(file) {
      file.set('pendingVariables', []);
    },
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            'VariableDeclaration'(curPath) {
              const node = curPath.node
              const declarations = node.declarations
              declarations.forEach(ele => {
                if (ele.id.name === options.pendingName) {
                  const bindingPath = path.scope.getBinding(options.pendingName).path
                  Object.entries(bindingPath.scope.bindings).forEach(([key, binding]) => {
                    binding.path.traverse({
                      'BinaryExpression'(elePath) {
                        if (checkTrue(elePath.node)) {
                          if(types.isConditionalExpression(elePath.parent)) {
                            elePath.skip()
                          } else {
                            // console.log(`start: line:${elePath.node.loc.start.line},col:${elePath.node.loc.start.column}`)
                            // console.log(`end: line:${elePath.node.loc.start.line},col:${elePath.node.loc.start.column}`)
                            let replacement = []
                            for(let i=0;i<elePath.container.consequent.body.length;i++) {
                              replacement.push(elePath.container.consequent.body[i])
                            }

                            elePath.parentPath.replaceWithMultiple([
                              ...replacement
                            ])
                          }
                        }
                      },
                      'ConditionalExpression'(elePath) {
                        if (checkTrue(elePath.node.test) || t.isIdentifier(elePath.node.test)) {
                          elePath.replaceWith(elePath.node.consequent)
                        }
                      },
                      ReturnStatement(path) {
                      },
                    })
                  })

                }
              })
            },
            'IfStatement'(curPath) {
              if(curPath.node.test.name === options.pendingName && t.isIdentifier(curPath.node.test)) {
                curPath.replaceWithMultiple(curPath.node.consequent.body)
              }
            },
          })
          // if (!state.trackerImportId) {
          //   state.trackerImportId  = importModule.addDefault(path, 'tracker',{
          //       nameHint: path.scope.generateUid('tracker')
          //   }).name;
          // }
          // state.trackerAST = api.template.statement(`${state.trackerImportId}()`)();
        },
      },
      'ReturnStatement'(path, state) {
        // remove returnstatement's siblings
        const getAllNextSiblings = path.getAllNextSiblings()
        getAllNextSiblings.forEach(sibling => {
          sibling.remove()
        })
      },
    },
  }
})

module.exports = customedPlugin
