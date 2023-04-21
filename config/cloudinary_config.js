import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

let cloud_name = process.env.cloudinary_name;
let api_key = process.env.cloudinary_api_key;
let api_secret = process.env.cloudinary_secret;

export default cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});
