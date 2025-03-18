import { Jimp } from "jimp";
import * as Path from "node:path";
import fs from "fs";

export default async function normalizeImage(path) {
  const correctedPath = path.replace(/\\/g, "/");
  const image = await Jimp.read(correctedPath);

  image.resize({ w: 200 });
  const imageFilename = Date.now() + Path.extname(path);
  await image.write(`public/images/${imageFilename}`);

  fs.unlink(path, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
  const normalizedImage = `/images/${imageFilename}`;
  return normalizedImage;
}
