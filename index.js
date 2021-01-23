const puppeteer = require('puppeteer');
const path = require("path");
const Download = require('./download');
const fileSystem = require("fs");

function getFilepath(chapter) {
  const directory = `./downloads/${chapter}`

  if (!fileSystem.existsSync(directory))
    fileSystem.mkdirSync(directory);

  const filepath = path.resolve(__dirname, directory);

  return filepath;
}

async function run(chapter) {
  console.log(`[One Piece Downloader] - Downloading chapter ${chapter} ...`);

  const browser = await puppeteer.launch();

  const IMAGE_SELECTOR = '#leitor-opex .center .paginamanga';

  for(let pageNumber = 1; pageNumber < 25; pageNumber++) {
    const page = await browser.newPage();

    await page.goto(`https://onepieceex.net/mangas/leitor/${chapter}/#${pageNumber}`);

    const imageSource = await page.$eval(IMAGE_SELECTOR, image => image.src);

    const vectorImageSource = imageSource.split("/");

    const fileName = vectorImageSource[vectorImageSource.length - 1];

    const cannotDownload = fileName === "z.jpg" || fileName === "loading.gif";

    if(cannotDownload) process.exit();

    else {
      Download(imageSource, getFilepath(chapter) ,function() {
      });
    }
  }

  browser.close();
  
  process.exit();
}

run(process.argv[process.argv.length - 1]);