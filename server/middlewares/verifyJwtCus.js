const jwt = require("jsonwebtoken");

const verifyJwtCustomer = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_CUSTOMER, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.sendStatus(403); // Forbidden
    }

    req.user = decoded.InfoUser; // Assign the decoded user information
    next();
  });
};

module.exports = verifyJwtCustomer;
