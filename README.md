# Translate Aussie Chrome Extension

This extension translates selected text on a webpage to Chinese using the Google Translate API.

## How to Set Up

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up your API Key:**
    *   In the `src` directory, rename the file `apiKey.example.ts` to `apiKey.ts`.
    *   Open the new `apiKey.ts` file and replace `"YOUR_GOOGLE_API_KEY"` with your actual Google Translate API key.

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

To use this extension, you need a Google Translate API key. You can get one from the [Google Cloud Platform Console](https://console.cloud.google.com/).

**Important:** The `src/apiKey.ts` file is included in the `.gitignore` file, so your API key will not be committed to Git. However, you should still be careful not to expose your API key in other ways.
