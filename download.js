const https = require("https");
const fs = require("fs");
const path = require("path");

function download(url, filepath, callback) {
  const filename = path.basename(url);

  const request = https.get(url, function(response) {
    const fileStream = fs.createWriteStream(path.resolve(filepath, filename));

    response.pipe(fileStream);

    fileStream.on("error", error => {
      console.log("Error writting to the stream.");
      console.log(error);
    });
    
    fileStream.on("close", () => {
      callback(filename);
    });

    fileStream.on("finish", () => {
      fileStream.close();
    });    
  });

  request.on("error", error => {
    console.log("Error downloading the file.");
    console.log(error);
  });
}

module.exports = download;

