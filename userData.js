// userData.js
const fs = require('fs');
const path = require('path');

const dataDirectory = path.join(__dirname, 'userData');

function getUserFilePath(userId) {
  return path.join(dataDirectory, `user_${userId}.json`);
}

function readUserData(userId) {
  const filePath = getUserFilePath(userId);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    return {};
  }
}

function writeUserData(userId, data) {
  const filePath = getUserFilePath(userId);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addJournalEntry(userId, entry) {
  const data = readUserData(userId);
  data.entries = data.entries || [];
  data.entries.push(entry);
  writeUserData(userId, data);
}

module.exports = { readUserData, writeUserData, addJournalEntry };
