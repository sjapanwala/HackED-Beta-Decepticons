// renderer.js
const userId = "user email"; // Example user email

// Add a journal entry
async function addEntry(entry) {
  await window.api.invoke('add-journal-entry', userId, entry);
}

// Get journal entries
async function fetchEntries() {
  const entries = await window.api.invoke('get-journal-entries', userId);
  console.log(entries); // Display entries in the UI
}
