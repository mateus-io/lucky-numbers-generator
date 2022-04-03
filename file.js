const fs = require('fs');

function writeFile(filename, content) {
  const data = JSON.stringify(content, null, 2);
  try {
    fs.writeFileSync(filename, data);
    return true;
  } catch {
    return false;
  }
}

function readFile(filename) {
  try {
    return JSON.parse(fs.readFileSync(filename));
  } catch {
    return null;
  }
}

module.exports = {
  writeFile,
  readFile
}