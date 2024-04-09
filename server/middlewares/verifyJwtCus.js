const jwt = require("jsonwebtoken");
const verifyJwtCustomer = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403); //inavlid token
    }
    req.id = user.CustomerId;
    next();
  });
};
module.exports = verifyJwtCustomer;
