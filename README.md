# Paiza Connector
Paiza Connector is a Google Apps Script designed to automate data submission to a specified endpoint by extracting information from a Google Spreadsheet. This script fetches data from specified cells, structures it into a form submission, and logs the submission time both within the spreadsheet and on a dedicated logging sheet.

## Features

- **Data Extraction:** Automatically retrieves data from a Google Spreadsheet.
- **Automated Submissions:** Submits data to a specified endpoint using HTTP POST requests.
- **Logging:** Logs each submission time in the spreadsheet and a separate logging sheet for tracking and audit purposes.

## Prerequisites

Before you begin, make sure you have:
- A Google account with access to Google Drive and Google Sheets.
- Access to Google Apps Script.
- A target endpoint URL where data will be submitted.
- Required authentication tokens and any other necessary data for the form submission.

## Setup

1. **Open Google Sheets:**
   - Open or create a new Google Spreadsheet.
   - Name your worksheet appropriately as per your needs (e.g., 'アドレス帳1').

2. **Open Google Apps Script:**
   - Go to Extensions > Apps Script.
   - Copy and paste the code from this repository into the script editor.
   - Replace placeholder values like `YOUR_AUTH_TOKEN`, `YOUR_COUPON_CODE`, and the `url` with actual data relevant to your configuration.

3. **Configure the Script:**
   - Ensure the sheet names and cell ranges in the script match those in your spreadsheet.
   - Adjust the logging mechanisms if different behavior is desired.

## Deployment

1. **Save and Name Your Project:**
   - Click on the floppy disk icon to save your project.
   - Name your project (e.g., 'paiza-connector').

2. **Deploy the Script:**
   - Click on 'Deploy' > 'New deployment'.
   - Choose 'Select type' > 'Web app'.
   - Set 'Execute as' to your account.
   - Set 'Who has access' to 'Anyone with Google account' or as per your security requirements.
   - Click 'Deploy' and authorize the script if prompted.

3. **Set Triggers (Optional):**
   - If you need the script to run automatically at set intervals, set up a time-driven trigger.
   - Go to Triggers > Add Trigger, select your function, and specify the trigger type and frequency.

## Usage

To manually execute the function:
- Open the Apps Script project.
- Select the function `submitFormData` in the drop-down menu.
- Click on the play button to run the function.
