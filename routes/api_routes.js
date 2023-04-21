import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Hello From Api",
  });
});

import auth from '../services/Authentication/controller/AuthController.js';
routes.use(`/auth`, auth);

import user from '../services/User/controller/UserController.js';
routes.use(`/user`, user);

import category from '../services/Category/controller/CategoryController.js';
routes.use(`/category`, category);

import product from '../services/Products/controller/ProductController.js';
routes.use(`/products`, product);

import cart from '../services/Cart/controller/CartController.js';
routes.use(`/cart`, cart);

export default routes;
