import db from "../../../db.js";
import slug from "slug";
import { v2 as cloudinary } from "cloudinary";
import something from "../../../config/cloudinary_config.js";

const fetchCategory = (req, res) => {
  let limit = req.query.limit || 10;
  let sql = "select * from categories limit ?";
  db.query(sql, limit, (error, results, fields) => {
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

const fetchSingleCat = (req, res) => {
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

const deleteCat = (req, res) => {
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

const postCat = (req, res) => {
  let images = req.files.images;
  let { title, description, user } = req.body;
  let slugs = slug(title);
  let sql =
    "insert into categories(title, slug, description, image, user_id) values(?, ?, ?, ?, ?)";

  cloudinary.uploader.upload(images.tempFilePath, (error, results) => {
    if (error) throw error;
    let value = [title, slugs, description, results["url"], user];
    db.query(sql, value, (error, results, fields) => {
      if (error) throw error;
      return res.status(200).send({
        status: 200,
        message: "Upload complete",
      });
    });
  });
};

const updateCat = (req, res) => {
  let images = req.files.images;
  let id = req.params.id;
  let { title, description, user_id } = req.body;
  let slugs = slug(title);
  let sql =
    "update categories set title  = ?, slug = ?, description = ?, user_id = ? where id = ?";
  cloudinary.uploader.upload(images.tempFilePath, (error, results) => {
    if (error) throw error;
    let value = [title, slugs, description, results["url"], user_id, id];
    db.query(sql, value, (error, results, fields) => {
      if (error) throw error;
      if (results) {
        return res.status(201).send({
          status: 201,
          message: "Update complete",
        });
      }
      return res.status(400).send({
        status: 400,
        message: "Failed to update",
      });
    });
  });
};

export default {
  fetchCategory,
  fetchSingleCat,
  deleteCat,
  postCat,
  updateCat,
};
