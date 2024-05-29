function importCsvFromGmail() {
  var query = 'from:paiza@ditu.jp subject:"「Python3入門編」 講座の学習状況レポート" has:attachment filename:zip is:unread';
  var threads = GmailApp.search(query);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var dateReceived = Utilities.formatDate(message.getDate(), "GMT", "yyyy-MM-dd");
      var sheetName = "Imported on " + dateReceived;  // 创建以接收日期为名的新Sheet
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
      }
      var attachments = message.getAttachments();
      attachments.forEach(function(attachment) {
        if (attachment.getContentType() === 'application/zip') {
          var zipBlob = attachment.copyBlob();
          var unzippedFiles = Utilities.unzip(zipBlob);
          unzippedFiles.forEach(function(file) {
            if (file.getName().endsWith('.csv')) {
              var data = Utilities.parseCsv(file.getDataAsString());
              if (data.length > 0) {
                sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
              }
            }
          });
        }
      });
      message.markRead();  // 标记邮件为已读
    });
  });
}
