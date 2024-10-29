const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401); // Unauthorized if no token or invalid format
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_ADMIN, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired" });
        return res.redirect("/login");
      }
      console.error("JWT Verification Error:", err.message);
      return res.sendStatus(403);
    }

    req.user = decoded.InfoAdmin;
    next();
  });
};

module.exports = verifyJwtAdmin;
