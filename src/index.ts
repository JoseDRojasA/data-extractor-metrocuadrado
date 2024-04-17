import { resolve } from "path";
import puppeteer, { ElementHandle } from "puppeteer";

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

  const totalResults = [];

  let lastNextPageButton: ElementHandle | null;
  do {
    lastNextPageButton = await page.$(".item-icon-next.page-item.disabled");
    const nextElement = await page.$(".item-icon-next.page-item");
    const resultList = await page.$$(".realestate-results-list > li");
    for (const resultItem of resultList) {
      const linkElement = await resultItem.$("a");

      const productAttributes = await linkElement?.evaluate((node) => ({
        publication_title: node.getAttribute("data-gtm-productname"),
        publication_url: node.getAttribute("href"),
        product_sku: node.getAttribute("data-gtm-productsku"),
        product_price: node.getAttribute("data-gtm-productprice"),
        product_category: node.getAttribute("data-gtm-productcategory"),
        product_city: node.getAttribute("data-gtm-city"),
        product_zone: node.getAttribute("data-gtm-zone"),
        product_neighborhood: node.getAttribute("data-gtm-neighborhood"),
        business_type: node.getAttribute("data-gtm-businesstype"),
        product_type: node.getAttribute("data-gtm-propertytype"),
      }));

      totalResults.push({
        ...productAttributes,
      });
    }
    if (nextElement) {
      await nextElement.click();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    console.log(totalResults.length);
  } while (!lastNextPageButton);

  console.log("Extraction Finished");

  await browser.close();
})();
