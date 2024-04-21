const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

const verifyJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401); // Unauthorized if no token or invalid format
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.sendStatus(403); // Forbidden due to invalid token
    }

    // Token is valid, decoded payload is available in `decoded`
    req.adminId = decoded.AdminId;
    req.role = decoded.AdminRole; // Assuming AdminId is a property in the JWT payload
    next();
  });
};

module.exports = verifyJwtAdmin;
