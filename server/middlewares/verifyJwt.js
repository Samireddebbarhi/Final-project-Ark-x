const jwt = require('jsonwebtoken');

const verifyJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.MY_SECRET, (err, user) => {
    if (err){
      console.log(err);
      return res.sendStatus(403); //invalid token

    } 
    req.id = user.AdminId;
    next();
  });
};
module.exports = {verifyJwtAdmin}