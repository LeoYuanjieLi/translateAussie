
let bubble: HTMLDivElement | null = null;

function handleTextSelection() {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim().length === 0) {
    removeBubble();
    return;
  }

  const selectedText = selection.toString();
  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ action: "translate", text: selectedText }, (response) => {
      console.log("Response from background script:", response);
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
        createBubble(selection, `Error: ${chrome.runtime.lastError.message}`);
        return;
      }
      if (response && response.translation) {
        createBubble(selection, response.translation);
      } else {
        const errorMessage = response?.translation || "Error: Could not get translation.";
        createBubble(selection, errorMessage);
      }
    });
  } else {
    // This case is unlikely in a real extension environment but good for robustness.
    createBubble(selection, "Error: Chrome runtime not available.");
  }
}

function removeBubble() {
  if (bubble) {
    bubble.remove();
    bubble = null;
  }
}

document.addEventListener("mouseup", handleTextSelection);
document.addEventListener("mousedown", (event) => {
  // Hide bubble if user clicks outside of it
  if (bubble && !bubble.contains(event.target as Node)) {
    removeBubble();
  }
});

function createBubble(selection: Selection, translatedText: string) {
  removeBubble();

  bubble = document.createElement("div");
  bubble.id = "translate-bubble";
  bubble.innerHTML = `
    <div class="translate-bubble-content">
      <p style="margin: 0;"><strong>Aussie:</strong> ${translatedText}</p>
    </div>
  `;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  document.body.appendChild(bubble);

  bubble.style.left = `${rect.left + window.scrollX}px`;
  bubble.style.top = `${rect.bottom + window.scrollY + 5}px`;
}
