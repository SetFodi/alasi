const SHEET_ID = '1Ho5CZLXcNhgRtN-Wmtudr6_gYbWGq6pUV0ZJcnCkpd8';
const WEBHOOK_SECRET = '';

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  if (WEBHOOK_SECRET && payload.secret !== WEBHOOK_SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheets()[0];

  sheet.appendRow(payload.row || [
    payload.width ? `${payload.width} მ` : '',
    payload.extension ? `${payload.extension} მ` : '',
    payload.selectedFabricLabel || payload.selectedFabricName || payload.fabric || '',
    payload.totalPrice ? `${payload.totalPrice} ₾` : '',
    payload.name || '',
    payload.phone || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
