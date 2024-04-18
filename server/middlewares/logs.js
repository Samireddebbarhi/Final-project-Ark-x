const logs = (req, res, next) => {
  console.log(
    new Date().toISOString() +
      "the method " +
      req.methode +
      "from the url " +
      req.url
  );
  next();
};

module.exports = logs;