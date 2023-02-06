const { declare } = require('@babel/helper-plugin-utils');

const customedPlugin = declare((api, options, dirname) => {
  api.assertVersion(7)

  return {
    pre(file) {
      file.set('state', []);
    },
    visitor: {

      Program: {
        enter(path, state) {},
        'VariableDeclaration|ReturnStatement'(path, state) {},
      }
    }
  }
})

module.exports = customedPlugin
