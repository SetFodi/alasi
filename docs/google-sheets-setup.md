# Google Sheets Order Webhook

Use this for the admin order sheet:

https://docs.google.com/spreadsheets/d/1Ho5CZLXcNhgRtN-Wmtudr6_gYbWGq6pUV0ZJcnCkpd8/edit

The current site sends this row order:

1. განი
2. გაშლა
3. ქსოვილი
4. ფასი
5. empty spacer column
6. სახელი გვარი
7. ტელ ნომერი

## Setup

1. Open the Google Sheet.
2. Go to Extensions -> Apps Script.
3. Paste the code from `docs/google-sheets-webhook.gs`.
4. Optional but recommended: set `WEBHOOK_SECRET` to a long random value.
5. Click Deploy -> New deployment.
6. Select type: Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copy the Web app URL.
10. Add it to Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`.
11. If you set `WEBHOOK_SECRET`, add the same value to Vercel as `GOOGLE_SHEETS_WEBHOOK_SECRET`.
12. Redeploy the site.

After that, every Ares calculator submission appends a row to the sheet.
