const jwt = require("jsonwebtoken");
const verifyJwtCustomer = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_CUSTOMER, (err, user) => {
    if (err) {
      res.sendStatus(403); //inavlid token*
      console.log(res);
    }
    req.user = user.InfoUser;
    //req.userId = user.InfoUser.id;
    //req.username = user.InfoUser.username;
    next();
  });
};
module.exports = verifyJwtCustomer;