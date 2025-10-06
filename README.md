# Translate Aussie Chrome Extension

<img src="public/icon64.png" width="64" height="64" alt="Translate Aussie Icon">

This extension translates selected text on a webpage to Chinese using the Google Translate API.



## How to Set Up

1.  **Install dependencies:**

    `npm install`

2.  **Set up your API Key:**
    *   This extension requires each user to provide their own Google Translate API key.
    *   After loading the extension, right-click the extension icon and choose "Options".
    *   Enter your Google Translate API key and click "Save".

3.  **Build the extension:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory with the bundled extension files.

## How to Load in Chrome

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Enable "Developer mode" in the top right corner.
3.  Click on "Load unpacked".
4.  Select the `dist` directory from this project.

## How to Use

1.  Select any text on a webpage.
2.  A bubble will appear with the translation.

## Google Translate API Key

This extension requires a Google Translate API key to function. You can obtain one from the Google Cloud Platform Console. The key is stored locally and securely using `chrome.storage`.
> [!WARNING]
> **Security Notice:** Exposing an API key in a browser extension can be risky, as other extensions could potentially access it. To mitigate this risk, create an API key that follows the principle of least privilege. For example, restrict the key to only allow access to the Google Translate API and nothing else. It is also crucial to monitor the key's usage regularly for any suspicious activity. Use at your own risk.