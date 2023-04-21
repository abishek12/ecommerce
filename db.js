import sql from "mysql2";
import { config } from "dotenv";
config();

const connection = sql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connection established");
});

connection.on("error", (err) => {
  console.error("Database error:", err);
});

export default connection;
