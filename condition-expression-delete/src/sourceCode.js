let condition = true

function checkFunction () {
  if (condition) {
    return 'check_function_true'
  }
  return false
}

function checkTwoEqualFunction() {
  if (true) {
    if (condition == true) {
      console.log('aaa')
      return 'if==true'
    }
  }
  return false
}

function checkThreeEqualFunction() {
  if (condition === true) {
    return 'if===true'
  }
  return false
}
 
function checkExpressFunction() {
  return condition === true ? 'express_func_true' : 'fff'
}

const arrowFunction = () => {
  return conditon ? 'arrow_function_true' : 'no_arrow_function_false'
}

const arrowFunctionNoBlock = () => condition ? 'arrow_func_no_block_true' : 'no_arrow_func_no_block_false'

class testClazz {
	testFunc() {
    return condition === true ? 'clazz_true' : 'clazz_false'
  }
}
