import jwt from "jsonwebtoken";
import express  from "express";
const app = express();

const authHelper = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const token = req.headers.authorization;

  // Verify the JWT token
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // If the JWT token is valid, attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware function
    next();
  });
}


export default authHelper;
