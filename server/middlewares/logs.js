// ./middlewares/logs.js

const logs= (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Don't forget to call next() to pass control to the next middleware
}


module.exports = {logs}