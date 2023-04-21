import Express from "express";
import controller from "../model/CartModel.js";

const app = Express.Router();

app.get("/", controller.fetchCart);
app.get("/:id", controller.fetchSingleCart);
app.post("/", controller.postCart);
app.put("/:id", controller.updateCart);

export default app;
