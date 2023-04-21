import db from "../../../db.js";
import { v4 as uuid } from "uuid";

const fetchCart = (req, res) => {
  let sql =
    "select p.title, p.thumbnail, c.quantity, c.price, u.name from cart c join products p on c.product_id = p.id join users u on c.user_id = u.id";
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    if (results.length == 0) {
      return res.status(200).send({
        status: 200,
        message: "Nothing to Display",
      });
    }
    return res.status(200).send({
      status: 200,
      data: results,
    });
  });
};

const fetchSingleCart = (req, res) => {
  let id = req.params.id;
  let sql =
    "select p.title, p.thumbnail, c.quantity, c.price, u.name from cart c join products p on c.product_id = p.id join users u on c.user_id = u.id where c.id = ?";
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    if (results.length == 0) {
      return res.status(200).send({
        status: 200,
        message: "Nothing to Display",
      });
    }
  });
};

const updateCart = (req, res) => {
  let id = req.params.id;
  let sql = "update cart set quantity = ? where id = ?";
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    return res.status(201).send({
      status: 201,
      message: "Updated",
    });
  });
};

const postCart = (req, res) => {
  let cartId = uuid();
  let { user, product, quantity, price } = req.body;
  let sql =
    "insert into cart(cart_id, user_id, product_id, quantity, price) values(?, ?, ?, ?, ?)";
  let values = [cartId, user, product, quantity, price];
  db.query(sql, values, (error, results, fields) => {
    if (error) throw error;
    return res.send(201).send({
      stauts: 201,
      meessage: "Inserted Cart",
    });
  });
};

export default {
  fetchCart,
  fetchSingleCart,
  updateCart,
  postCart
};
