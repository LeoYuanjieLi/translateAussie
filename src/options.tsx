import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Options = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load the saved API key from storage
    chrome.storage.local.get(['apiKey'], (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
      }
    });
  }, []);

  const saveApiKey = () => {
    // Save the API key to storage
    chrome.storage.local.set({ apiKey }, () => {
      setStatus('API key saved.');
      setTimeout(() => {
        setStatus('');
      }, 2000);
    });
  };

  return (
    <div>
      <h1>Translate Aussie Options</h1>
      <label htmlFor="apiKey">Google Cloud API Key:</label>
      <input
        type="text"
        id="apiKey"
        name="apiKey"
        size={50}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={saveApiKey}>Save</button>
      <p>{status}</p>
    </div>
  );
};

ReactDOM.render(<Options />, document.getElementById('root'));
