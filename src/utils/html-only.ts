import { Page } from "puppeteer";

export const htmlOnly = async (page: Page) => {
  await page.setRequestInterception(true); // enable request interception

  page.on("request", (req: any) => {
    if (!["document", "xhr", "fetch", "script"].includes(req.resourceType())) {
      return req.abort();
    }
    req.continue();
  });
};
