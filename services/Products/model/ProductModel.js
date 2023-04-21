import db from "../../../db.js";
import slug from "slug";
import { v2 as cloudinary } from "cloudinary";
import something from "../../../config/cloudinary_config.js";
import { v4 as uuidv4 } from 'uuid';

const fetchProduct = (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  let offset = (page - 1) * limit;
  let category = req.query.category || "";
  let search = req.query.search || "";

  let sql = "SELECT * FROM products WHERE 1=1";
  let value = [];

  if (category) {
    sql += " AND category = ?";
    value.push(category);
  }
  if (search) {
    sql += " AND (title LIKE ?)";
    value.push(search);
  }
  sql += " LIMIT ? OFFSET ?";
  value.push(limit, offset);

  db.query(sql, value, (error, results, fields) => {
    if (error) throw error;
    if (results.length == 0) {
      return res.status(200).send({
        stauts: 200,
        message: "Nothing to Show",
      });
    }
    return res.status(200).send({
      stauts: 200,
      limit: limit,
      count: results.length,
      data: results,
    });
  });
};

const fetchSingleProduct = (req, res) => {
  let id = req.params.id;
  let sql = "select * from categories where id = ?";
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    if (results) {
      return res.status(200).send({
        stauts: 200,
        data: results,
      });
    }
    return res.status(400).send({
      stauts: 400,
      meessage: "Something went wrong",
    });
  });
};

const deleteProduct = (req, res) => {
  let id = req.params.id;
  let sql = "delete from categories where id = ?";
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    if (results) {
      return res.status(200).send({
        stauts: 200,
        meessage: "Item deleted",
      });
    }
    return res.status(400).send({
      stauts: 400,
      meessage: "Something went wrong",
    });
  });
};

const postProduct = (req, res) => {
  let images = req.files.thumbnail;
  let { title, category_id, sku_id, author_id, discount_percent, price, stock, short_description, description, rating } = req.body;
  let slugs = slug(title);
  let sql =
    "insert into products(title, slug, sku_id, category_id, author_id, discount_percent, price, thumbnail, stock, short_description, description, rating) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  cloudinary.uploader.upload(images.tempFilePath, (error, results) => {
    if (error) throw error;
    let value = [title, slugs, sku_id || uuidv4(), category_id, author_id, discount_percent, price, results["url"], stock, short_description, description, rating || 0];
    db.query(sql, value, (error, results, fields) => {
      if (error) throw error;
      return res.status(200).send({
        status: 200,
        message: "Upload complete",
      });
    });
  });
};

const updateProduct = (req, res) => {};

export default {
  fetchProduct,
  fetchSingleProduct,
  deleteProduct,
  postProduct,
  updateProduct,
};
