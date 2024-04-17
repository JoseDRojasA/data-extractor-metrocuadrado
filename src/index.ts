import { writeFileSync } from "fs";
import { json2csv } from "json-2-csv";
import puppeteer from "puppeteer";
import { env } from "./env";
import { extractInitialPageData } from "./steps/extract-initial-page-data";
import { extractSpecificData } from "./steps/extract-specific-data";
import { htmlOnly } from "./utils/html-only";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  htmlOnly(page);

  await page.goto(`${env.rootUrl}/apartamento-casa/venta/bucaramanga/`);

  await page.setViewport({ width: 1307, height: 1024 });

  const initialPageDataList = await extractInitialPageData(page);

  console.log(
    `We are going to extract data from ${initialPageDataList.length} buildings`
  );

  const fullData = await extractSpecificData(page, initialPageDataList);

  await browser.close();

  const csv = await json2csv(fullData, {});

  writeFileSync("data.csv", csv);

  console.log("Import done");
})();
