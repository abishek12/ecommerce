import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 4000;
const api_version = process.env.API_VERSION;

// use of middlewaree
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

import routes from "./routes/api_routes.js";
app.use(`${api_version}`, routes);

import webRoutes from "./routes/website_routes.js";
app.use("/", webRoutes);

app.listen(PORT, () => {
  console.log(`Sever is loading at: ${PORT}`);
});
