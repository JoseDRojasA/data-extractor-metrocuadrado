import puppeteer from "puppeteer";
import { extractInitialPageData } from "./steps/extract-initial-page-data";
import { ServerPropsData } from "./models/server-props-data";
import { ProductData } from "./models/product-data";

const rootUrl = "https://www.metrocuadrado.com";

declare var document: any;

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`${rootUrl}/apartamento-casa/venta/bucaramanga/`);

  // Set screen size
  await page.setViewport({ width: 1307, height: 1024 });

  const initialPageDataList = await extractInitialPageData(page);
  const fullData: ProductData[] = [];

  for (const initialPageData of [initialPageDataList[0]]) {
    await page.goto(`${rootUrl}${initialPageData.publication_url}`);
    const data: ServerPropsData = await page.evaluate(function () {
      const scriptTag = document.querySelector("#__NEXT_DATA__");
      return JSON.parse(scriptTag.textContent);
    });

    fullData.push({
      ...initialPageData,
      antiquity: data.props.initialProps.pageProps.realEstate.builtTime,
      stratum: data.props.initialProps.pageProps.realEstate.stratum,
      isUsed: data.props.initialProps.pageProps.realEstate.isUsed,
      featured: data.props.initialProps.pageProps.realEstate.featured,
      longitude: data.props.initialProps.pageProps.realEstate.coordinates.lon,
      latitude: data.props.initialProps.pageProps.realEstate.coordinates.lat,
      privateArea: data.props.initialProps.pageProps.realEstate.area,
      builtArea: data.props.initialProps.pageProps.realEstate.areac,
      rooms: data.props.initialProps.pageProps.realEstate.rooms,
      bathrooms: data.props.initialProps.pageProps.realEstate.bathrooms,
      garages: data.props.initialProps.pageProps.realEstate.garages,
    });
  }

  

  await browser.close();
})();
