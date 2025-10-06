chrome.action.onClicked.addListener((tab) => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translate") {
    chrome.storage.local.get(['apiKey', 'language'], (result) => {
      if (!result.apiKey) {
        sendResponse({ translation: "Error: API key not set." });
        return;
      }

      const API_KEY = result.apiKey;
      const text = request.text;
      const targetLang = result.language || 'en'; // Default to English if no language is set

      const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          clearTimeout(timeoutId);
          if (data.data && data.data.translations && data.data.translations.length > 0) {
            sendResponse({ translation: data.data.translations[0].translatedText });
          } else {
            console.error("Error from Google Translate API:", data);
            sendResponse({ translation: `Error: ${data?.error?.message || 'Could not translate text.'}` });
          }
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          if (error.name === "AbortError") {
            console.error("Fetch aborted due to timeout.");
            sendResponse({ translation: "Error: Translation timed out." });
          } else {
            console.error("Error translating text:", error);
            sendResponse({ translation: "Error: Could not translate text. See the background page console for more details." });
          }
        });
    });

    return true; // Indicates that the response is sent asynchronously
  }
});
