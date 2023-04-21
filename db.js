import sql from "mysql2";

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connection established");
});

connection.on("error", (err) => {
  console.error("Database error:", err);
});

export default connection;
