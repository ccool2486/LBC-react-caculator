import operate from './operate'
import isNumber from './isNumber'

/**
 * 這個js吃:
 *   1. 一個目前狀態的物件
 *   2. 一個buttonName的OBJ (可能是數字也可能是運算子)
 * 
 * 然後把一個obj回傳：
 *   total:s      目前的total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */

// TRICK: 那個buttonName，會由Button.js傳入 （一層一層引用）
export default function calculate(obj, buttonName) { //obj是目前的state
  // 點AC清除
  if (buttonName === 'AC') { 
    return {
      total: null,
      next: null,
      operation: null,
    }
  }

  // TRICK: 透過isNumber來判斷，這樣就不用在buttonName吃不同的function了
  if (isNumber(buttonName)) { 
    if (buttonName === '0' && obj.next === '0') {
      return {}
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName }
      }
      return { next: buttonName }
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      return {
        next: obj.next + buttonName,
        total: null,
      }
    }
    return {
      next: buttonName,
      total: null,
    }
  }
  
  // 如果打小數點的話...
  if (buttonName === '.') {
    if (obj.next) {
      if (obj.next.includes('.')) { // 如果next原本就有小數點
        return {}
      }
      return { next: obj.next + '.' } // 如果next沒有小數點，就加一個小數點
    }
    if (obj.operation) {
      return { next: '0.' }
    }
    if (obj.total) {
      if (obj.total.includes('.')) {
        return {}
      }
      return { total: obj.total + '.' }
    }
    return { total: '0.' }
  }

  if (buttonName === '=') {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation), // TRICK: 使用Operate library處理計算
        next: null,
        operation: null,
      }
    } else {
      // '=' with no operation, nothing to do
      return {}
    }
  }

  if (buttonName === '+/-') { // 翻轉正負按鈕
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() } // 處理浮點，因為有可能是小數點 http://www.victsao.com/blog/81-javascript/86-javascript-parse-number
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() } // 翻轉next的正負值
    }
    return {}
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    }
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return { operation: buttonName }
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  }
}
