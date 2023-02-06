module.exports = ({
  name,
}) => {
  return {
    "name": name,
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "@babel/core": "^7.13.14",
      "@babel/generator": "^7.13.9",
      "@babel/helper-module-imports": "^7.13.12",
      "@babel/parser": "^7.13.13",
      "@babel/template": "^7.12.13",
      "@babel/traverse": "^7.13.13",
      "@babel/types": "^7.13.14",
      "babel-plugin-tester": "^10.0.0",
      "jest": "^26.6.3"
    },
  }
}