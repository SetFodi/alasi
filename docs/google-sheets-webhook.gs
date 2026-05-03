var SHEET_ID = '1Ho5CZLXcNhgRtN-Wmtudr6_gYbWGq6pUV0ZJcnCkpd8';
var WEBHOOK_SECRET = 'zamtaria2004';

function doGet() {
  var output = ContentService.createTextOutput(JSON.stringify({
    ok: true,
    message: 'Alasi Google Sheets webhook is live'
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doPost(e) {
  var payload = JSON.parse(e.postData.contents || '{}');

  if (WEBHOOK_SECRET && payload.secret !== WEBHOOK_SECRET) {
    var unauthorized = ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: 'Unauthorized'
    }));
    unauthorized.setMimeType(ContentService.MimeType.JSON);
    return unauthorized;
  }

  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  var sheet = spreadsheet.getSheets()[0];
  var row = payload.row;

  if (!row) {
    row = [
      payload.width ? payload.width + ' მ' : '',
      payload.extension ? payload.extension + ' მ' : '',
      payload.selectedFabricLabel || payload.selectedFabricName || payload.fabric || '',
      payload.totalPrice ? payload.totalPrice + ' ₾' : '',
      payload.name || '',
      payload.phone || ''
    ];
  }

  sheet.appendRow(row);

  var output = ContentService.createTextOutput(JSON.stringify({ ok: true }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
