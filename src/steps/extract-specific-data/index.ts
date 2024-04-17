import { Page } from "puppeteer";
import { ProductData } from "../../models/product-data";
import { ServerPropsData } from "../../models/server-props-data";
import { env } from "../../env";
import { LandingPageProductData } from "../../models/landing-page-product-data";

declare var document: any;

export const extractSpecificData = async (
  page: Page,
  pageDataList: LandingPageProductData[]
) => {
  const fullData: ProductData[] = [];
  let index = 0;
  for (const initialPageData of pageDataList) {
    let retries = 3;
    while (retries) {
      try {
        await page.goto(`${env.rootUrl}${initialPageData.publication_url}`, {
          timeout: 60000,
        });
        const data: ServerPropsData = await page.evaluate(function () {
          const scriptTag = document.querySelector("#__NEXT_DATA__");
          return JSON.parse(scriptTag?.textContent);
        });

        const realEstate = data?.props?.initialProps?.pageProps?.realEstate;
        const productNeighborhood = initialPageData?.product_neighborhood;
        const commonNeighborhood =
          data?.props?.initialState?.realestate?.basic?.commonNeighborhood;

        fullData.push({
          ...initialPageData,
          product_neighborhood:
            !productNeighborhood || productNeighborhood === "NA"
              ? commonNeighborhood
              : productNeighborhood,
          antiquity: realEstate?.builtTime,
          stratum: realEstate?.stratum,
          isUsed: realEstate?.isUsed,
          featured: realEstate?.featured?.flatMap(({ items }) => items),
          longitude: realEstate?.coordinates?.lon,
          latitude: realEstate?.coordinates?.lat,
          privateArea: realEstate?.area,
          builtArea: realEstate?.areac,
          rooms: realEstate?.rooms,
          bathrooms: realEstate?.bathrooms,
          garages: realEstate?.garages,
          adminPrice: realEstate?.detail.adminPrice,
        });

        if (index % 10 === 0) {
          console.log(`Extracted ${index} products`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        index++;
        break; // if page loads successfully, break the loop
      } catch (error: any) {
        console.log("Network error occurred. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        retries--;
        if (retries === 0) throw error; // if no retries left, throw error
      }
    }
  }
  return fullData;
};
