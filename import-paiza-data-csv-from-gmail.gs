function importCsvFromGmail() {
  var query = 'from:paiza@ditu.jp has:attachment filename:zip is:unread';
  var threads = GmailApp.search(query);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Imported Data - " + new Date().toISOString()); // 加入时间戳以区分不同的Sheet

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var attachments = message.getAttachments();
      attachments.forEach(function(attachment) {
        if (attachment.getContentType() === 'application/zip') {
          var zipBlob = attachment.copyBlob();
          var unzippedFiles = Utilities.unzip(zipBlob);
          unzippedFiles.forEach(function(file) {
            if (file.getName().endsWith('.csv')) {
              var data = Utilities.parseCsv(file.getDataAsString());
              if (data.length > 0) {
                sheet.getRange(sheet.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);  // 确保数据追加到sheet最后
              }
            }
          });
        }
      });
      message.markRead();  // 标记邮件为已读
    });
  });
}

function setupWeeklyTrigger() {
  // Create a time-driven trigger that runs every Monday
  ScriptApp.newTrigger('importCsvFromGmail')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)  // 选择一个合适的时间，例如早上9点
    .create();
}
