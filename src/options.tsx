import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Options = () => {
  const [apiKey, setApiKey] = useState('');
  const [language, setLanguage] = useState('en');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load the saved API key and language from storage
    chrome.storage.local.get(['apiKey', 'language'], (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
      }
      if (result.language) {
        setLanguage(result.language);
      }
    });
  }, []);

  const saveOptions = () => {
    // Save the API key and language to storage
    chrome.storage.local.set({ apiKey, language }, () => {
      setStatus('Options saved.');
      setTimeout(() => {
        setStatus('');
      }, 2000);
    });
  };

  return (
    <div>
      <h1>Translate Aussie Options</h1>
      <div>
        <label htmlFor="apiKey">Google Cloud API Key:</label>
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          size={50}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="language">Translate to:</label>
        <select
          id="language"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="zh">Mandarin Chinese</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
      <button onClick={saveOptions}>Save</button>
      <p>{status}</p>
    </div>
  );
};

ReactDOM.render(<Options />, document.getElementById('root'));
