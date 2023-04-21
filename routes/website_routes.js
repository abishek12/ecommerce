import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "E-commerce Application",
  });
});

export default routes;
