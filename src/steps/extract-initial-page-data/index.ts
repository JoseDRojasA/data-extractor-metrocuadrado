import { ElementHandle, Page } from "puppeteer";
import { LandingPageProductData } from "../../models/landing-page-product-data";

export const extractInitialPageData = async (page: Page) => {
  const totalResults: LandingPageProductData[] = [];
  console.log("Extracting data from initial page");

  let lastNextPageButton: ElementHandle | null;
  let pageNumber = 1;
  do {
    console.log(`Reading page ${pageNumber}`);
    pageNumber++;
    lastNextPageButton = await page.$(".item-icon-next.page-item.disabled");
    const nextElement = await page.$(".item-icon-next.page-item");
    const resultList = await page.$$(".realestate-results-list > li");
    for (const resultItem of resultList) {
      const linkElement = await resultItem.$("a");

      const productAttributes: LandingPageProductData | undefined =
        await linkElement?.evaluate((node) => ({
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

      if (productAttributes) {
        totalResults.push(productAttributes);
      }
    }
    if (nextElement) {
      await nextElement.click();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } while (!lastNextPageButton);

  return totalResults;
};
