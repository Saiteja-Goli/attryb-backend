const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware function for token verification
function authentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; 
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token or Expired" });
    }
    req.user = decoded.user; // Assuming the token contains user information
    next();
  });
}

module.exports = authentication;
