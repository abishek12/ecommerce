import db from "../../../db.js";

const fetchUsers = (req, res) => {
  let limit = req.query.limit || 10;
  let sql = "select * from users limit ?";
  db.query(sql, limit, (error, result, field) => {
    if (error) throw error;
    if (result.length > 0) {
      return res.status(200).send({
        status: 200,
        count: result.length,
        limit: limit,
        data: result,
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Nothing to display",
    });
  });
};

const fetchUser = (req, res) => {
  let id = req.params.id;
  let sql = "select * from users where id = ?";
  db.query(sql, id, (error, results, _) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).send({
        status: 200,
        data: results,
      });
    }
    return res.status(404).send({
      status: 404,
      message: "User doesn't exists",
    });
  });
};

const deleteUser = (req, res) => {
  let id = req.params.id;
  let sql = "delete from users where id = ?";

  db.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    return res.status(200).send({
      status: 200,
      message: "User Deleted",
    });
  });
};

const search = (req, res) => {
  let { email, role, order } = req.query;
  let limit = req.query.limit || 10;

  let sql = "select * from users where email = ? or role = ? order by email ?";
  let values = [email, role, order];

  db.query(sql, values, (error, results, fields) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).send({
        status: 200,
        count: results.length,
        limit: limit,
        data: results,
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Something went wrong",
    });
  });
};

const updateUser = (req, res) => {};

export default {
  fetchUsers,
  fetchUser,
  deleteUser,
  updateUser,
  search,
};
