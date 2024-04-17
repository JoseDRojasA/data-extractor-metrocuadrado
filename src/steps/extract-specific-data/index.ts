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
  for (const initialPageData of pageDataList) {
    await page.goto(`${env.rootUrl}${initialPageData.publication_url}`);
    const data: ServerPropsData = await page.evaluate(function () {
      const scriptTag = document.querySelector("#__NEXT_DATA__");
      return JSON.parse(scriptTag.textContent);
    });

    const realEstate = data.props.initialProps.pageProps.realEstate;
    const productNeighborhood = initialPageData.product_neighborhood;
    const commonNeighborhood =
      data.props.initialState.realestate.basic.commonNeighborhood;

    fullData.push({
      ...initialPageData,
      product_neighborhood:
        !productNeighborhood || productNeighborhood === "NA"
          ? commonNeighborhood
          : productNeighborhood,
      antiquity: realEstate.builtTime,
      stratum: realEstate.stratum,
      isUsed: realEstate.isUsed,
      featured: realEstate.featured.flatMap(({ items }) => items),
      longitude: realEstate.coordinates.lon,
      latitude: realEstate.coordinates.lat,
      privateArea: realEstate.area,
      builtArea: realEstate.areac,
      rooms: realEstate.rooms,
      bathrooms: realEstate.bathrooms,
      garages: realEstate.garages,
    });
  }
  return fullData;
};
