import db from "../../../db.js";

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
  let sql = "select * from cart where id = ?";
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

export default {
    fetchCart,
    fetchSingleCart,
}
