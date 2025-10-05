
let bubble: HTMLDivElement | null = null;

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    const selectedText = selection.toString();
    chrome.runtime.sendMessage({ action: "translate", text: selectedText }, (response) => {
      console.log("Response from background script:", response);
      if (response && response.translation) {
        createBubble(selection, response.translation);
      } else {
        createBubble(selection, "Error: No response from background script.");
      }
    });
  } else {
    if (bubble) {
      bubble.remove();
      bubble = null;
    }
  }
});

function createBubble(selection: Selection, translatedText: string) {
  if (bubble) {
    bubble.remove();
  }

  bubble = document.createElement("div");
  bubble.id = "translate-bubble";
  bubble.innerHTML = `
    <div class="translate-bubble-content">
      <p><strong>Aussie:</strong> ${translatedText}</p>
    </div>
  `;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  document.body.appendChild(bubble);

  bubble.style.left = `${rect.left + window.scrollX}px`;
  bubble.style.top = `${rect.bottom + window.scrollY + 5}px`;
}
