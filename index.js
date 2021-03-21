const puppeteer = require('puppeteer');
const path = require("path");
const fileSystem = require("fs");
const Download = require('./utils/download');
const waitForNavigation = require("./utils/waitForNavigation");
const chapters = require("./utils/chapters");

function filePath(chapter, page) {
  const directory = `./downloads/${chapters[chapter-1]}`;

  if (!fileSystem.existsSync(directory))
    fileSystem.mkdirSync(directory);

  const filepath = path.resolve(__dirname, directory, `${page}.png`);

  return filepath;
}


async function run(chapter) {
  console.log(`[One Piece Downloader] - Downloading ${chapters[chapter-1]} ...`);

  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();
  
  await page.setDefaultNavigationTimeout(0); 
  
  await page.goto(`https://onepieceex.net/mangas/leitor/${chapter}/#1`);
  
  const numberOfPages = await page.$$("#mangapaginas li");

  for(let currentPage = 1; currentPage < numberOfPages.length; currentPage++) {
    await Promise.all([
      page.click(`.pagina-${currentPage}`),

      waitForNavigation(page, 250)
    ]);
  
    const imageSource = await page.$eval('#leitor-opex .center a img', image => image.src);
    
    await Download(imageSource, filePath(chapter, currentPage))
  }

  browser.close();
  
  process.exit();
}

run(process.argv[process.argv.length - 1]);