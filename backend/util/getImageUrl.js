import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default async function getImageUrl(path) {
  const result = await cloudinary.uploader.upload(path, {
    transformation: [
      {
        width: 200,
        height: 200,
        crop: "fill",
        gravity: "auto",
      },
    ],
    format: "png",
  });

  const avatarURL = result.url;

  fs.unlink(path, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
  return avatarURL;
}
