import fs from "fs";
import { Transform } from "json2csv";
import { ProductData } from "../../models/product-data";

export const loadCsvFile = (data: ProductData[]) => {
  const json2csv = new Transform();
  const output = fs.createWriteStream("data.csv", { encoding: "utf8" });

  return new Promise((resolve, reject) => {
    json2csv.pipe(output);
    data.forEach((item) => json2csv.write(JSON.stringify(item)));
    json2csv.on("error", (error) => {
      reject(error);
    });
    json2csv.end();
    output.on('finish', () => {
      resolve(null);
    });
  });
};
