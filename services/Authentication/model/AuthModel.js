import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import db from "../../../db.js";

let salt = bcrypt.genSaltSync(10);

const login = (req, res) => {
  let { email, password } = req.body;

  let token = Jwt.sign({ email }, "secret-key", { expiresIn: "1h" });

  let sql = "SELECT * FROM users where email = ?";

  db.query(sql, email, (error, results, __) => {
    if (error) throw error;
    if (results.length == 1) {
      let userPassword = results[0].password;
      bcrypt.compare(
        password,
        userPassword,
        (passwordError, passwordResult) => {
          if (passwordError) throw passwordError;
          if (passwordResult == true) {
            return res.status(201).send({
              status: 201,
              token: token,
            });
          } else {
            return res.status(201).send({
              status: 200,
              message: 'Password didn\'t match',
            });
          }
        }
      );
    } else {
      return res.status(200).send({
        status: 200,
        message: "User not found",
      });
    }
  });
};

const register = (req, res) => {
  let { fullname, email, password, gender, dob, contact, role } = req.body;

  let sql =
    "INSERT INTO users(name, email, password, gender, date_of_birth, contact_number, role) values(?, ?, ?, ?, ?, ?, ?)";

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    let values = [fullname, email, hash, gender, dob, contact, role];
    db.query(sql, values, (errors, results, fields) => {
      if (errors) throw errors;
      if (results) {
        return res.status(200).json({
          status: 200,
          message: "User Register successfull",
        });
      }
      return res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    });
  });
};

export default {
  login,
  register,
};
