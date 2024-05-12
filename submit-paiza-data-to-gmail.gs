function submitFormData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    Logger.log("未能获取电子表格对象");
    return;
  }
  
  var sheet = spreadsheet.getSheetByName('アドレス帳1'); // 替换 'アドレス帳1' 为你的工作表名称
  if (!sheet) {
    Logger.log("未找到名为 'アドレス帳1'");
    return;
  }
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("表格中没有数据可供提交");
    return;
  }
  
  var url = 'https://example.com/endpoint'; // 替换为你的实际URL
  
  var workGroupRange = sheet.getRange("B7:B" + lastRow);
  var workGroupValues = workGroupRange.getValues();
  var workGroupIds = workGroupValues.flat();
  
  var formDataArray = [];
  for (var i = 0; i < workGroupIds.length; i++) {
    var formData = {
      authenticity_token: 'YOUR_AUTH_TOKEN', // 替换 'YOUR_AUTH_TOKEN' 为你的实际认证令牌
      coupon_code: 'YOUR_COUPON_CODE', // 替换 'YOUR_COUPON_CODE' 为你的优惠券代码
      work_group_id: parseInt(workGroupIds[i]),
      commit: 'ACTION_DESCRIPTION', // 替换 'ACTION_DESCRIPTION' 为你的操作描述
    };
    formDataArray.push(formData);
  }
  
  for (var j = 0; j < formDataArray.length; j++) {
    var options = {
      method: 'post',
      payload: formDataArray[j]
    };
    
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  }
  
  // 记录每次操作时间
  var timestamp = new Date();
  var formattedTimestamp = Utilities.formatDate(timestamp, "JST", "yyyy-MM-dd HH:mm");
  var timestampCell = sheet.getRange("G1");
  timestampCell.setValue(formattedTimestamp);
  
  // 在发送记录表中记录每次操作时间
  var logSheet = spreadsheet.getSheetByName("发送记录");
  if (!logSheet) {
    logSheet = spreadsheet.insertSheet("发送记录");
    logSheet.getRange("A1").setValue("操作时间");
  }
  var lastLogRow = logSheet.getLastRow();
  logSheet.getRange(lastLogRow + 1, 1).setValue(formattedTimestamp);
}
