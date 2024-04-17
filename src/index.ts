import puppeteer from "puppeteer";
import { env } from "./env";
import { extractInitialPageData } from "./steps/extract-initial-page-data";
import { extractSpecificData } from "./steps/extract-specific-data";
import { loadCsvFile } from "./steps/load-csv-file";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(`${env.rootUrl}/apartamento-casa/venta/bucaramanga/`);

  await page.setViewport({ width: 1307, height: 1024 });

  const initialPageDataList = await extractInitialPageData(page);
  const fullData = await extractSpecificData(page, [initialPageDataList[0]]);

  await browser.close();

  await loadCsvFile(fullData);
})();
