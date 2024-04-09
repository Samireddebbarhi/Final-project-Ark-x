const logs = (req, res, next) => {
  console.log(
    new Date().toISOString() +
      "the method " +
      req.method +
      "from the url " +
      req.url
  );
  next();
};

module.exports = logs;
