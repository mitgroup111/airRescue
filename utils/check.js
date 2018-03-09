// 检测是否有输入  
function checkIsNotNull(content) {
  //console.log(content)
  return (content && content != null)
}

// 检测输入输入的手机号是否正确 
function checkPhoneNum(phoneNum) {
  //console.log(phoneNum)
  if (!checkIsNotNull(phoneNum) || !(/^1[34578]\d{9}$/.test(phoneNum)) || phoneNum.length != 11) {
    return false
  }
  return true
}
// 比较两个内容是否相等  
function isContentEqual(content_1, content_2) {
  if (content_1 === content_2) {
    return true
  }
  return false
}

module.exports = {
  checkIsNotNull: checkIsNotNull,
  checkPhoneNum: checkPhoneNum,
  isContentEqual: isContentEqual
}  