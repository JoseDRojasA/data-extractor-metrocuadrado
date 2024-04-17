import { resolve } from "path";
import puppeteer, { ElementHandle } from "puppeteer";
import { extractInitialPageData } from "./steps/extract-initial-page-data";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://www.metrocuadrado.com/apartamento-casa/venta/bucaramanga/"
  );

  // Set screen size
  await page.setViewport({ width: 1307, height: 1024 });

  const initialPageData = extractInitialPageData(page);

  console.log("Extraction Finished");

  await browser.close();
})();
