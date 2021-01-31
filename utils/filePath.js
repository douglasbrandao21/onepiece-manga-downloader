const path = require("path");
const fileSystem = require("fs");

function filePath(chapter) {
  const directory = `../downloads/${chapter}`

  if (!fileSystem.existsSync(directory))
    fileSystem.mkdirSync(directory);

  const filepath = path.resolve(__dirname, directory);

  return filepath;
}

module.exports = filePath;